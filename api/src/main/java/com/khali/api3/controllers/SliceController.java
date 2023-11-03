package com.khali.api3.controllers;

import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.pay_rate_rule.IntegratedPayRateRule;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.domain.slice.ProtoSlice;
import com.khali.api3.domain.slice.Slice;
import com.khali.api3.domain.util.Pair;
import com.khali.api3.repositories.AppointmentRepository;
import com.khali.api3.repositories.PayRateRuleRepository;
import com.khali.api3.services.PayRateRuleService;

@RestController
@RequestMapping("/slices")
public class SliceController {

    @Autowired private final AppointmentRepository appointmentRepository;
    @Autowired private final PayRateRuleRepository payRateRuleRepository;
    @Autowired private final PayRateRuleService payRateRuleService;

    private static final long oneDay = 24 * 60 * 60 * 1000L;

    public SliceController(
        AppointmentRepository appointmentRepository,
        PayRateRuleRepository payRateRuleRepository,
        PayRateRuleService payRateRuleService
    ) {
        this.appointmentRepository = appointmentRepository;
        this.payRateRuleRepository = payRateRuleRepository;
        this.payRateRuleService = payRateRuleService;
    }

    // Maps storage-centric PayRateRule to algorithm-centric IntegratedPayRateRule
    // This conversion helps the algorithm by including actual time information based on Shift
    private List<IntegratedPayRateRule> mapPayRateRules (List<PayRateRule> payRateRules) {
        return payRateRules
            .stream()
            .map(payRateRule -> new IntegratedPayRateRule(
                payRateRule,
                PairLocalTimeToTimestamp(
                    payRateRuleService.getShiftTimeRange(payRateRule.getShift())
                )
            ))
            .collect(Collectors.toList());
    }

    // The main route of the SliceController, returns the Slices of any appointment not excluded by the filters
    @GetMapping
    public List<Slice> calculateSlices (
        Optional<Timestamp> filterPeriodStart,
        Optional<Timestamp> filterPeriodEnd
    ) {

        // request PayRateRule data from database and map to IntegratedPayRateRule
        List<IntegratedPayRateRule> payRateRulesCumulative = mapPayRateRules(payRateRuleRepository.findCumulative());
        List<IntegratedPayRateRule> payRateRulesMinHourCount = mapPayRateRules(payRateRuleRepository.findMinHourCount());
        List<IntegratedPayRateRule> payRateRulesDefault = mapPayRateRules(payRateRuleRepository.findDefault());

        return appointmentRepository
            .findByActive()                                                                         // find the active appointments
            .stream()                                                                               // start a Stream: convert List to Stream
            .peek(appointment -> System.out.println("appointment: " + appointment.toString()))      // peek / print contents
            .<List<ProtoSlice>>map(appointment -> splitDays(                                        // map List<Appointment> to List<List<ProtoSlice>>,
                ProtoSlice.fromAppointment(appointment)                                             //      each Appointment becomes a List<ProtoSlice>
            ))                                                                                      //      one ProtoSlice per day per appointment.
            .flatMap(List::stream)                                                                  // map List<List<ProtoSlice>> to List<ProtoSlice>
            .peek(slice -> System.out.println("slice after first flatMap: " + slice.toString()))    // peek / print contents
            .filter(slice -> filterSlicePeriod(                                                     // Apply parameter filter 
                slice,
                filterPeriodStart,
                filterPeriodEnd
            ))
            .peek(slice -> System.out.println("slice after filter: " + slice.toString()))           // peek / print contents
            .<List<ProtoSlice>>map(slice -> generateSlicesAppointment(                              // Start Algorithm recursion for each ProtoSlice.
                slice,
                payRateRulesCumulative,
                payRateRulesMinHourCount,
                payRateRulesDefault
            ))
            .flatMap(List::stream)                                                                  // We should have a List<ProtoSlice> for each ProtoSlice, we need to flatten the list
            .peek(slice -> System.out.println("final slices: " + slice.toString()))                 // peek / print contents
            .<Slice>map(protoSlice -> Slice.fromProtoSlice(protoSlice))                             // map / convert each ProtoSlice to Slice
            .collect(Collectors.toList());                                                          // end Stream: convert Stream back to List
    }

    // entry point of recursion
    public List<ProtoSlice> generateSlicesAppointment (
        ProtoSlice appointmentSlice,
        List<IntegratedPayRateRule> payRateRulesCumulative,
        List<IntegratedPayRateRule> payRateRulesMinHourCount,
        List<IntegratedPayRateRule> payRateRulesDefault
    ) {

        // Priority rule 1 - Cumulative:
        // Cumulative payRateRules (those where the `overlap` bool is set to true) go into a separated List
        // so they don't get reused throughout the rest of the algorithm
        // they are added into the returning list at the end
        List<ProtoSlice> subSlicesCumulative = new ArrayList<ProtoSlice>();
        for (IntegratedPayRateRule payRateRule: payRateRulesCumulative) {
            subSlicesCumulative.addAll(getSubSlicesCumulative(
                appointmentSlice,
                payRateRule
            ));
        }

        // Create the list of subSlices, initially populated with the given slice
        List<ProtoSlice> subSlices = new ArrayList<ProtoSlice>(List.of(appointmentSlice));
        
        // Priority rule 2 - MinHourCount:
        // for each MinHourCount payRateRule (those where the `minHourCount` is greater than 0):
        // replaces the list with the result of `getSubSlicesMinHourCount` of that rule.
        // MinHourCount payRateRules should be checked before we split the slices with default rules.
        // Slices generated from the `overlap` of one of those rules should NOT have it's rule changed afterwards (they are locked).
        // only Slices generated from the `remaining` of an `overlap` could have their payRateRule reassigned. 
        for (IntegratedPayRateRule payRateRule: payRateRulesMinHourCount) {
            subSlices = subSlices.stream()
                .<List<ProtoSlice>>map(subSlice -> getSubSlicesMinHourCount(
                    subSlice,
                    payRateRule
                ))
                .<ProtoSlice>flatMap(List::stream)
                .collect(Collectors.toList());
        }
        
        // after the priority rules are checked, we can check the default rules (those that only differentiate between day and time)
        for (IntegratedPayRateRule payRateRule: payRateRulesDefault) {
            subSlices = subSlices.stream()
                .<List<ProtoSlice>>map(subSlice -> getSubSlicesDefault(
                    subSlice,
                    payRateRule
                ))
                .<ProtoSlice>flatMap(List::stream)
                .collect(Collectors.toList());
        }

        subSlices.addAll(subSlicesCumulative);
        return subSlices;
    }

    private Optional<Pair<Timestamp>> PairLocalTimeToTimestamp(Optional<Pair<LocalTime>> shiftTimeRange) {
        return shiftTimeRange.isEmpty() 
            ? Optional.empty()
            : Optional.of(
                new Pair<Timestamp>(
                    Timestamp.valueOf(shiftTimeRange.get().x.atDate(java.time.LocalDate.now())),
                    Timestamp.valueOf(shiftTimeRange.get().y.atDate(java.time.LocalDate.now()))
                )
            );
    }

    private boolean checkDayOfWeek (ProtoSlice slice, Boolean[] daysOfWeek) {
        return daysOfWeek[slice.getStart().toLocalDateTime().getDayOfWeek().getValue() % 7];
    }

    public List<ProtoSlice> getSubSlices(
        ProtoSlice appointmentSlice,
        IntegratedPayRateRule integratedPayRateRule,
        boolean isCumulative,
        boolean isMinHourCount
    ) {
        if (!checkDayOfWeek(appointmentSlice, integratedPayRateRule.getPayRateRule().getDaysOfWeek())) {
            return isCumulative ? List.of() : List.of(appointmentSlice);
        }

        if (appointmentSlice.getLock() && !isCumulative) return List.of(appointmentSlice);
    
        Optional<Pair<Timestamp>> overlapOptional = getSliceOverlap(appointmentSlice, integratedPayRateRule.getTimeRange());
    
        if (overlapOptional.isEmpty()) return isCumulative ? List.of() : List.of(appointmentSlice);
    
        Pair<Timestamp> overlap = overlapOptional.get();
        Long overlapPreviousHours = getTotalTime(appointmentSlice.getStart(), appointmentSlice.getEnd());
    
        List<ProtoSlice> slices = new ArrayList<>();
        Optional<Pair<Timestamp>> remainingOptional = getRemainingFromOverlap(appointmentSlice, overlap);
    
        if (remainingOptional.isPresent()) {
            Pair<Timestamp> remaining = remainingOptional.get();
            Long remainingPreviousHours = overlapPreviousHours;
    
            if (remaining.x.before(overlap.x)) overlapPreviousHours += getTotalTime(remaining.x, remaining.y);
            else remainingPreviousHours += getTotalTime(overlap.x, overlap.y);

            if (isCumulative) slices.addAll(
                getSubSlices(
                    ProtoSlice.fromPair(
                        appointmentSlice.getAppointment(),
                        remaining,
                        integratedPayRateRule.getPayRateRule(),
                        remainingPreviousHours,
                        true
                    ),
                    integratedPayRateRule,
                    true,
                    false
                )
            );

            else slices.add(
                ProtoSlice.fromPair(
                    appointmentSlice.getAppointment(),
                    remaining,
                    integratedPayRateRule.getPayRateRule(),
                    remainingPreviousHours,
                    isCumulative
                )
            );
        }
    
        slices.add(
            ProtoSlice.fromPair(
                appointmentSlice.getAppointment(),
                overlap,
                integratedPayRateRule.getPayRateRule(),
                overlapPreviousHours,
                isCumulative
            )
        );

        return isCumulative
            ? slices
            : slices
                .stream()
                .map(slice -> getSubSlices(slice, integratedPayRateRule, false, isMinHourCount))
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
    
    public List<ProtoSlice> getSubSlicesCumulative (ProtoSlice appointmentSlice, IntegratedPayRateRule integratedPayRateRule) {

        if (!checkDayOfWeek(appointmentSlice, integratedPayRateRule.getPayRateRule().getDaysOfWeek())) return List.of();

        // Get the overlap between given slice and payRateRule
        Optional<Pair<Timestamp>> overlapOptional = getSliceOverlap(
            appointmentSlice,
            integratedPayRateRule.getTimeRange()
        );

        // no subslices of the given rule
        if (overlapOptional.isEmpty()) return List.of();

        // overlap is present, get the value inside the optional
        Pair<Timestamp> overlap = overlapOptional.get();
        Long overlapPreviousHours = getTotalTime(appointmentSlice.getStart(), appointmentSlice.getEnd());

        // get the remaining span of the original slice
        Optional<Pair<Timestamp>> remainingOptional = getRemainingFromOverlap(
            appointmentSlice,
            overlap
        );

        // create a new list with the subslice of intersection
        List<ProtoSlice> slices = new ArrayList<>();

        // if there's remaining 
        if (remainingOptional.isPresent()) {

            Pair<Timestamp> remaining = remainingOptional.get();
            Long remainingPreviousHours = overlapPreviousHours;

            if (remaining.x.before(overlap.x)) overlapPreviousHours += getTotalTime(remaining.x, remaining.y);
            else remainingPreviousHours += getTotalTime(overlap.x, overlap.y);

            // continue the recursion with the remaining and add the return to the slices list
            slices.addAll(
                getSubSlicesCumulative(
                    ProtoSlice.fromPair(
                        appointmentSlice.getAppointment(),
                        remaining,
                        integratedPayRateRule.getPayRateRule(),
                        remainingPreviousHours,
                        true
                    ),
                    integratedPayRateRule
                )
            );
        }

        slices.add(ProtoSlice.fromPair(
            appointmentSlice.getAppointment(),
            overlap,
            integratedPayRateRule.getPayRateRule(),
            overlapPreviousHours,
            true
        ));

        return slices;
    }

    public List<ProtoSlice> getSubSlicesMinHourCount (ProtoSlice appointmentSlice, IntegratedPayRateRule integratedPayRateRule) {

        // Get the overlap between given slice and payRateRule
        Optional<Pair<Timestamp>> overlapOptional = getSliceOverlap(
            appointmentSlice,
            integratedPayRateRule.getTimeRange()
        );

        // no subslices of the given rule
        if (overlapOptional.isEmpty()) return List.of(appointmentSlice);

        // overlap is present, get the value inside the optional
        Pair<Timestamp> overlap = overlapOptional.get();
        Long overlapPreviousHours = getTotalTime(appointmentSlice.getStart(), appointmentSlice.getEnd());

        // create a new list with the subslice of intersection
        List<ProtoSlice> slices = new ArrayList<>();

        // get the remaining span of the original slice
        Optional<Pair<Timestamp>> remainingOptional = getRemainingFromOverlap(
            appointmentSlice,
            overlap
        );

        // if there's remaining
        if (remainingOptional.isPresent()) {

            Pair<Timestamp> remaining = remainingOptional.get();
            Long remainingPreviousHours = overlapPreviousHours;

            if (remaining.x.before(overlap.x)) overlapPreviousHours += getTotalTime(remaining.x, remaining.y);
            else remainingPreviousHours += getTotalTime(overlap.x, overlap.y);

            // continue the recursion with the remaining and add the return to the slices list
            slices.add(
                ProtoSlice.fromPair(
                    appointmentSlice.getAppointment(),
                    remaining,
                    integratedPayRateRule.getPayRateRule(),
                    remainingPreviousHours,
                    true
                )
            );
        }

        slices.add(ProtoSlice.fromPair(
            appointmentSlice.getAppointment(),
            overlap,
            integratedPayRateRule.getPayRateRule(),
            overlapPreviousHours,
            true
        ));

        return slices
            .stream()
            .<List<ProtoSlice>>map(slice -> getSubSlicesMinHourCount(slice, integratedPayRateRule))
            .<ProtoSlice>flatMap(List::stream)
            .collect(Collectors.toList());
    }

    public List<ProtoSlice> getSubSlicesDefault (ProtoSlice appointmentSlice, IntegratedPayRateRule integratedPayRateRule) {
        if (appointmentSlice.getLock()) return List.of(appointmentSlice);

        // Get the overlap between given slice and payRateRule
        Optional<Pair<Timestamp>> overlapOptional = getSliceOverlap(
            appointmentSlice,
            integratedPayRateRule.getTimeRange()
        );

        // no subslices of the given rule
        if (overlapOptional.isEmpty()) return List.of(appointmentSlice);

        // overlap is present, get the value inside the optional
        Pair<Timestamp> overlap = overlapOptional.get();
        Long overlapPreviousHours = getTotalTime(appointmentSlice.getStart(), appointmentSlice.getEnd());

        // create a new list with the subslice of intersection
        List<ProtoSlice> slices = new ArrayList<>();

        // get the remaining span of the original slice
        Optional<Pair<Timestamp>> remainingOptional = getRemainingFromOverlap(
            appointmentSlice,
            overlap
        );

        // if there's remaining
        if (remainingOptional.isPresent()) {

            Pair<Timestamp> remaining = remainingOptional.get();
            Long remainingPreviousHours = overlapPreviousHours;

            if (remaining.x.before(overlap.x)) overlapPreviousHours += getTotalTime(remaining.x, remaining.y);
            else remainingPreviousHours += getTotalTime(overlap.x, overlap.y);

            // continue the recursion with the remaining and add the return to the slices list
            slices.add(
                ProtoSlice.fromPair(
                    appointmentSlice.getAppointment(),
                    remaining,
                    integratedPayRateRule.getPayRateRule(),
                    remainingPreviousHours,
                    false
                )
            );
        }

        slices.add(ProtoSlice.fromPair(
            appointmentSlice.getAppointment(),
            overlap,
            integratedPayRateRule.getPayRateRule(),
            overlapPreviousHours,
            false
        ));

        return slices
            .stream()
            .<List<ProtoSlice>>map(slice -> getSubSlicesDefault(slice, integratedPayRateRule))
            .<ProtoSlice>flatMap(List::stream)
            .collect(Collectors.toList());
    }

    public static Pair<Timestamp> trimPair (Pair<Timestamp> pair) {
        return new Pair<Timestamp>(
            trimTimestamp(pair.x),
            trimTimestamp(pair.y)
        );
    }

    public static Timestamp trimTimestamp (Timestamp timestamp) {
        return new Timestamp(
            timestamp.getTime() % oneDay
        );
    }

    private boolean filterSlicePeriod(ProtoSlice slice, Optional<Timestamp> filterPeriodStart, Optional<Timestamp> filterPeriodEnd) {
        return filterPeriodStart.isPresent()
            ? filterPeriodEnd.isPresent()
                ? intersects(slice, filterPeriodStart.get(), filterPeriodEnd.get())
                : !slice.getEnd().before(filterPeriodStart.get())
            : filterPeriodEnd.isPresent()
                ? !slice.getStart().after(filterPeriodEnd.get())
                : true;
    }

    private boolean intersects(ProtoSlice slice, Timestamp start, Timestamp end) {
        return slice.getStart().before(end) && slice.getEnd().after(start);
    }

    // Removes day, month, year information from Timestamp
    // private static Timestamp truncateToTime (Timestamp timestamp) {
    //     return new Timestamp(timestamp.getTime() % oneDay);
    // }

    // Removes hour, minute, second, mili information from Timestamp
    private static Timestamp truncateToDate (Timestamp timestamp) {
        return new Timestamp(timestamp.getTime() - (timestamp.getTime() % oneDay));
    }

    private List<ProtoSlice> splitDays (ProtoSlice slice) {
        List<ProtoSlice> slices = new ArrayList<>();

        Long previousDayHours = 0L;

        Timestamp currentDay = truncateToDate(slice.getStart());
        Timestamp nextDay = new Timestamp(currentDay.getTime() + oneDay);

        while (!currentDay.after(truncateToDate(slice.getEnd()))) {

            Timestamp currentSliceStart = timestampMax(currentDay, slice.getStart());
            Timestamp currentSliceEnd = timestampMin(nextDay, slice.getEnd());

            slices.add(new ProtoSlice(
                slice.getAppointment(),
                slice.getPayRateRule(),
                currentSliceStart,
                currentSliceEnd,
                previousDayHours,
                false
            ));
        
            previousDayHours += getTotalTime(currentSliceStart, currentSliceEnd);
            currentDay = new Timestamp(currentDay.getTime() + oneDay);
            nextDay = new Timestamp(nextDay.getTime() + oneDay);
        }

        return slices;
    }

    public static Timestamp timestampMin (Timestamp timestamp1, Timestamp timestamp2) {
        return timestamp2.after(timestamp1) ? timestamp1 : timestamp2;
    }

    public static Timestamp timestampMax (Timestamp timestamp1, Timestamp timestamp2) {
        return timestamp1.after(timestamp2) ? timestamp1 : timestamp2;
    }

    private Optional<Pair<Timestamp>> getSliceOverlap (ProtoSlice slice, Optional<Pair<Timestamp>> timeRangeOptional) {
        if (timeRangeOptional.isEmpty()) return Optional.of(
            new Pair<Timestamp>(
                slice.getStart(),
                slice.getEnd()
            )
        );
        Pair<Timestamp> timeRange = timeRangeOptional.get();
        Timestamp start = timestampMax(trimTimestamp(slice.getStart()), timeRange.x);
        Timestamp end = timestampMin(trimTimestamp(slice.getEnd()), timeRange.y);
        return start.before(end)
            ? Optional.of(new Pair<Timestamp>(start, end))
            : Optional.empty();
    }

    private Optional<Pair<Timestamp>> getRemainingFromOverlap(ProtoSlice slice, Pair<Timestamp> overlap) {
        Timestamp sliceStart = trimTimestamp(slice.getStart());
        Timestamp sliceEnd = trimTimestamp(slice.getEnd());
        Timestamp overlapStart = overlap.x;
        Timestamp overlapEnd = overlap.y;
        if (sliceStart.equals(overlapStart) && sliceEnd.equals(overlapEnd)) {
            return Optional.empty();
        }
        return sliceStart.before(overlapStart)
            ? Optional.of(new Pair<Timestamp>(sliceStart, overlapStart))
            : Optional.of(new Pair<Timestamp>(overlapEnd, sliceEnd));
    }

    private Long getTotalTime (Timestamp start, Timestamp end) {
        return start.getTime() - end.getTime();
    }
}
