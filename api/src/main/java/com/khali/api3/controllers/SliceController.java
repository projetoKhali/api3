package com.khali.api3.controllers;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.pay_rate_rule.IntegratedPayRateRule;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.domain.slice.Slice;
import com.khali.api3.domain.util.Pair;
import com.khali.api3.repositories.AppointmentRepository;
import com.khali.api3.repositories.PayRateRuleRepository;
import com.khali.api3.services.PayRateRuleService;
import com.khali.api3.util.SliceCalculator;

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
    public List<Slice> getSlices (
        Optional<Timestamp> filterPeriodStart,
        Optional<Timestamp> filterPeriodEnd
    ) {
        return Arrays.stream(SliceCalculator.calculateReports(
            appointmentRepository.findByActive().toArray(Appointment[]::new),
            mapPayRateRules(payRateRuleRepository.findAll()).toArray(IntegratedPayRateRule[]::new)
        ))
        .filter(slice -> filterSlicePeriod(
            slice,
            filterPeriodStart,
            filterPeriodEnd
        ))
        .collect(Collectors.toList());
    }

    // Maps storage-centric PayRateRule to algorithm-centric IntegratedPayRateRule
    // This conversion helps the algorithm by including actual time information based on Shift
    private List<IntegratedPayRateRule> mapPayRateRules (List<PayRateRule> payRateRules) {
        return payRateRules
            .stream()
            .map(payRateRule -> new IntegratedPayRateRule(
                payRateRule,
                pairLocalTimeToTimestamp(
                    payRateRuleService.getShiftTimeRange(payRateRule.getShift())
                )
            ))
            .collect(Collectors.toList());
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

    private Optional<Pair<Timestamp>> pairLocalTimeToTimestamp(Optional<Pair<LocalTime>> shiftTimeRangeOptional) {
        if (shiftTimeRangeOptional.isEmpty()) return Optional.empty();
        Pair<LocalTime> shiftTimeRange = shiftTimeRangeOptional.get();
        Timestamp start = Timestamp.valueOf(shiftTimeRange.x.atDate(LocalDate.of(1970, 1, 1)));
        Timestamp end = Timestamp.valueOf(shiftTimeRange.y.atDate(LocalDate.of(1970, 1, 1)));
        Optional<Pair<Timestamp>> result = Optional.of(new Pair<Timestamp>(
            start, start.after(end)
                ? new Timestamp(end.getTime() + oneDay)
                : end
        ));
        System.out.println("pairLocalTimetoTimestamp: " + result);
        return result;
    }

}
