package com.khali.api3.controllers;

import java.util.Optional;
import java.util.stream.Collectors;
import java.sql.Timestamp;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.util.Pair;
import com.khali.api3.domain.slice.Slice;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.domain.pay_rate_rule.IntegratedPayRateRule;
import com.khali.api3.repositories.AppointmentRepository;
import com.khali.api3.repositories.PayRateRuleRepository;
import com.khali.api3.services.PayRateRuleService;

@RestController
@RequestMapping("/slices")
public class SliceController {

    @Autowired private final AppointmentRepository appointmentRepository;
    @Autowired private final PayRateRuleRepository payRateRuleRepository;
    @Autowired private final PayRateRuleService payRateRuleService;

    public SliceController(
        AppointmentRepository appointmentRepository,
        PayRateRuleRepository payRateRuleRepository,
        PayRateRuleService payRateRuleService
    ) {
        this.appointmentRepository = appointmentRepository;
        this.payRateRuleRepository = payRateRuleRepository;
        this.payRateRuleService = payRateRuleService;
    }

    @GetMapping
    public List<Slice> calculateSlices (
        Optional<Timestamp> filterPeriodStart,
        Optional<Timestamp> filterPeriodEnd
    ) {
        List<PayRateRule> payRateRulesCumulative = payRateRuleRepository.findCumulative();
        List<PayRateRule> payRateRulesMinHourCount = payRateRuleRepository.findMinHourCount();

        List<Slice> result = appointmentRepository
            .findByActive()
            .stream()
            .peek(appointment -> System.out.println("appointment: " + appointment.toString()))
            .<List<Slice>>map(appointment -> splitDays(
                Slice.fromAppointment(appointment)
            ))
            .flatMap(List::stream)
            .peek(slice -> System.out.println("slice after first flatMap: " + slice.toString()))
            .filter(slice -> filterSlicePeriod(
                slice,
                filterPeriodStart,
                filterPeriodEnd
            ))
            .peek(slice -> System.out.println("slice after filter: " + slice.toString()))
            .<List<Slice>>map(slice -> generateSlicesAppointment(
                slice,
                payRateRulesCumulative,
                payRateRulesMinHourCount
            ))
            .flatMap(List::stream)
            .peek(slice -> System.out.println("final slices: " + slice.toString()))
            .collect(Collectors.toList());

        result.forEach(slice -> System.out.println("" + result.size() + " items | final slices: " + slice.toString()));
        return result;
    }

    public List<Slice> generateSlicesAppointment (
        Slice appointmentSlice,
        List<PayRateRule> payRateRulesCumulative,
        List<PayRateRule> payRateRulesMinHourCount

    ) {
        List<Slice> subSlicesCumulative = new ArrayList<Slice>();

        for (PayRateRule payRateRule: payRateRulesCumulative) {
            subSlicesCumulative.addAll(getSubSlicesCumulative(
                appointmentSlice,
                new IntegratedPayRateRule(
                    payRateRule,
                    PairLocalTimeToTimestamp(
                        payRateRuleService.getShiftTimeRange(payRateRule.getShift())
                    )
                )
            ));
        }





        // start from endDate
        // identify day
        // identify shift
        // match PayRateRule
        // continue recursion
        

        List<Slice> subSlices = new ArrayList<Slice>();
        subSlices.addAll(subSlicesCumulative);
        subSlices.add(appointmentSlice);

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

    public List<Slice> getSubSlicesCumulative (Slice appointmentSlice, IntegratedPayRateRule integratedPayRateRule) {

        // Get the overlap between given slice and payRateRule
        Optional<Pair<Timestamp>> overlapOptional = getSliceOverlap(
            appointmentSlice,
            integratedPayRateRule.getTimeRange()
        );

        // no subslices of the given rule
        if (overlapOptional.isEmpty()) return List.of();

        // overlap is present, get the value inside the optional
        Pair<Timestamp> overlap = overlapOptional.get();

        // create a new list with the subslice of intersection
        List<Slice> slices = new ArrayList<>(
            List.of(
                Slice.fromPair(
                    appointmentSlice.getAppointment(),
                    overlap,
                    integratedPayRateRule.getPayRateRule()
                )
            )
        );

        // get the remaining span of the original slice
        Optional<Pair<Timestamp>> remainingOptional = getRemainingFromOverlap(
            appointmentSlice,
            overlap
        );

        // if there's remaining 
        if (remainingOptional.isPresent()) {

            // continue the recursion with the remaining and add the return to the slices list
            slices.addAll(
                getSubSlicesCumulative(
                    Slice.fromPair(
                        appointmentSlice.getAppointment(),
                        remainingOptional.get(),
                        integratedPayRateRule.getPayRateRule()
                    ),
                    integratedPayRateRule
                )
            );
        }

        return slices;
    }

    public static Pair<Timestamp> trimPair (Pair<Timestamp> pair) {
        return new Pair<Timestamp>(
            trimTimestamp(pair.x),
            trimTimestamp(pair.y)
        );
    }

    public static Timestamp trimTimestamp (Timestamp timestamp) {
        return new Timestamp(
            timestamp.getTime() % (24 * 60 * 60 * 1000)
        );
    }

    private boolean filterSlicePeriod(Slice slice, Optional<Timestamp> filterPeriodStart, Optional<Timestamp> filterPeriodEnd) {
        return filterPeriodStart.isPresent()
            ? filterPeriodEnd.isPresent()
                ? intersects(slice, filterPeriodStart.get(), filterPeriodEnd.get())
                : !slice.getEnd().before(filterPeriodStart.get())
            : filterPeriodEnd.isPresent()
                ? !slice.getStart().after(filterPeriodEnd.get())
                : true;
    }

    private boolean intersects(Slice slice, Timestamp start, Timestamp end) {
        return slice.getStart().before(end) && slice.getEnd().after(start);
    }

    // Truncate timestamp to the start of the day
    private static Timestamp truncateToDay(Timestamp timestamp) {
        return new Timestamp(timestamp.getTime() - timestamp.getTime() % (24 * 60 * 60 * 1000));
    }

    private List<Slice> splitDays (Slice slice) {
        List<Slice> slices = new ArrayList<>();

        Timestamp sliceStart = slice.getStart();
        Timestamp sliceEnd = slice.getEnd();

        Timestamp currentStart = truncateToDay(sliceStart);
        Timestamp nextDay = truncateToDay(new Timestamp(sliceStart.getTime() + 24 * 60 * 60 * 1000));
        Timestamp currentEnd = (nextDay.before(sliceEnd) || nextDay.equals(sliceEnd)) ? nextDay : sliceEnd;

        while (currentStart.before(sliceEnd)) {
            slices.add(new Slice(
                slice.getAppointment(),
                slice.getPayRateRule(),
                currentStart,
                currentEnd
            ));

            // Move to the next day
            currentStart = currentEnd;
            nextDay.setTime(currentEnd.getTime() + 24 * 60 * 60 * 1000);
            currentEnd = (nextDay.before(sliceEnd) || nextDay.equals(sliceEnd)) ? nextDay : sliceEnd;
        }

        return slices;
    }

    public static Timestamp timestampMin (Timestamp timestamp1, Timestamp timestamp2) {
        return timestamp2.after(timestamp1) ? timestamp1 : timestamp2;
    }

    public static Timestamp timestampMax (Timestamp timestamp1, Timestamp timestamp2) {
        return timestamp1.after(timestamp2) ? timestamp1 : timestamp2;
    }

    private Optional<Pair<Timestamp>> getSliceOverlap (Slice slice, Optional<Pair<Timestamp>> timeRangeOptional) {
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

    private Optional<Pair<Timestamp>> getRemainingFromOverlap(Slice slice, Pair<Timestamp> overlap) {
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
}
