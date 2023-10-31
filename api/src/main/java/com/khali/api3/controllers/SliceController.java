package com.khali.api3.controllers;

import java.util.Optional;
import java.util.stream.Collectors;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.util.Pair;
import com.khali.api3.domain.slice.Slice;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.repositories.AppointmentRepository;
import com.khali.api3.repositories.PayRateRuleRepository;

@RestController
@RequestMapping("/slices")
public class SliceController {

    @Autowired private final AppointmentRepository appointmentRepository;
    @Autowired private final PayRateRuleRepository payRateRuleRepository;

    public SliceController(
        AppointmentRepository appointmentRepository,
        PayRateRuleRepository payRateRuleRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.payRateRuleRepository = payRateRuleRepository;
    }

    @GetMapping
    public List<Slice> calculateSlices (
        Optional<Timestamp> periodStart,
        Optional<Timestamp> periodEnd
    ) {
        List<Slice> slices = new ArrayList<Slice>();
        List<PayRateRule> payRateRulesCumulative = payRateRuleRepository.findCumulative();
        List<PayRateRule> payRateRulesMinHourCount = payRateRuleRepository.findMinHourCount();

        appointmentRepository
        .findByActive()
        .stream()
        // .filter() // filter by periodStart & periodEnd
        // split days before generateSlicesAppointment
        .<List<Slice>>map(appointment -> generateSlicesAppointment(
            Slice.fromAppointment(appointment),
            payRateRulesCumulative,
            payRateRulesMinHourCount
        ))
        .forEach(generatedSlices -> generatedSlices.forEach(
            slice -> generatedSlices.add(slice)
        ));

        return slices;
    }

    public List<Slice> generateSlicesAppointment (
        Slice appointmentSlice,
        List<PayRateRule> payRateRulesCumulative,
        List<PayRateRule> payRateRulesMinHourCount

    ) {
        List<Slice> subSlices = new ArrayList<Slice>();
        List<Slice> subSlicesCumulative = new ArrayList<Slice>();

        for (PayRateRule payRateRule: payRateRulesCumulative) {
            subSlicesCumulative.addAll(getSubSlicesCumulative(appointmentSlice, payRateRule));
        }





        // start from endDate
        // identify day
        // identify shift
        // match PayRateRule
        // continue recursion

        return subSlices;
    }

    public List<Slice> getSubSlicesCumulative (Slice appointmentSlice, PayRateRule payRateRule) {

        // Get the overlap between given slice and payRateRule
        Optional<Pair<Timestamp>> overlapOptional = getPayRateRuleSliceOverlap(appointmentSlice, payRateRule);

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
                    payRateRule
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
                        payRateRule
                    ),
                    payRateRule
                )
            );
        }

        return slices;
    }

    public Optional<Pair<Timestamp>> getPayRateRuleSliceOverlap (Slice slice, PayRateRule payRateRule) {
        // TODO: FIX: payRateRule doesn't have Timestamps to compare
        // TODO: Also check for shift and daysOfWeek
        Timestamp start = Math.max(slice.getStart(), payRateRule.getStartDate());
        Timestamp end = Math.min(slice.getEnd(), payRateRule.getEndDate());
        return start.before(end) ? Optional.of(new Pair<Timestamp>(start, end)) : Optional.empty();
    }

    public Optional<Pair<Timestamp>> getRemainingFromOverlap(Slice slice, Pair<Timestamp> overlap) {
        Timestamp sliceStart = slice.getStart();
        Timestamp sliceEnd = slice.getEnd();
        Timestamp overlapStart = overlap.getStart();
        Timestamp overlapEnd = overlap.getEnd();
        if (sliceStart.equals(overlapStart) && sliceEnd.equals(overlapEnd)) {
            return Optional.empty();
        }
        return sliceStart.before(overlapStart)
            ? Optional.of(new Pair<Timestamp>(sliceStart, overlapStart))
            : Optional.of(new Pair<Timestamp>(overlapEnd, sliceEnd));
    }
}
