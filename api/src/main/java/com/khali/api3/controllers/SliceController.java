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

        appointmentRepository.findByActive()
            .stream()
            // .filter() // filter by periodStart & periodEnd
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

        // no need to diferentiate cumulative rules yet
        // the first check should be for minHourCount rules
        for (PayRateRule payRateRule: payRateRulesCumulative) {
            for (Slice subSliceCumulative: getCumulativeSubSlices(appointmentSlice, payRateRule)) {
                subSlices.addAll(generateSlicesAppointment(subSliceCumulative));
            }
        }



        // start from endDate
        // identify day
        // identify shift 
        // match PayRateRule
        // continue recursion

        return subSlices;
    }

    public List<Slice> getSubSlicesCumulative (Slice appointmentSlice, PayRateRule PayRateRule) {

    }
}
