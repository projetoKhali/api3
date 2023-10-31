package com.khali.api3.services;

import java.time.LocalTime;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.parameter.Parameter;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.domain.pay_rate_rule.Shift;
import com.khali.api3.domain.util.Pair;
import com.khali.api3.repositories.ParametersRepository;
import com.khali.api3.repositories.PayRateRuleRepository;

@Service
public class PayRateRuleService {
    
    @Autowired private PayRateRuleRepository payRateRuleRepository;
    @Autowired private ParametersRepository parameterRepository;

    public PayRateRuleService (
        PayRateRuleRepository payRateRuleRepository,
        ParametersRepository parameterRepository
    ) {
        this.payRateRuleRepository = payRateRuleRepository;
        this.parameterRepository = parameterRepository;
    }

    public PayRateRule updatePayRateRule(Long id, PayRateRule newPayRateRule){
        PayRateRule payRateRuleExists = payRateRuleRepository.findById(id).orElse(null);
        
        if (payRateRuleExists != null) {
            if (newPayRateRule.getCode() != null) {
                payRateRuleExists.setCode(newPayRateRule.getCode());
            }

            if (newPayRateRule.getHourDuration() != 0.0) {
                payRateRuleExists.setHourDuration(newPayRateRule.getHourDuration());
            }

            if (newPayRateRule.getMinHourCount() != 0.0) {
                payRateRuleExists.setMinHourCount(newPayRateRule.getMinHourCount());
            }

            if (newPayRateRule.getPayRate() != 0.0) {
                payRateRuleExists.setPayRate(newPayRateRule.getPayRate());
            }

            if (newPayRateRule.getAppointmentType() != null) {
                payRateRuleExists.setAppointmentType(newPayRateRule.getAppointmentType());
            }

            // if (newPayRateRule.getDaysOfWeek() != null) {
            //     payRateRuleExists.setDaysOfWeek(newPayRateRule.getDaysOfWeek());
            // }

            if (newPayRateRule.getShift() != null) {
                payRateRuleExists.setShift(newPayRateRule.getShift());
            }
            
            if (newPayRateRule.getOverlap() != null) {
                payRateRuleExists.setOverlap(newPayRateRule.getOverlap());
            }
            
            if (newPayRateRule.getExpire_date() != null) {
                payRateRuleExists.setExpire_date(newPayRateRule.getExpire_date());
            }


            return payRateRuleRepository.save(payRateRuleExists);
        } else {
            throw new NoSuchElementException("PayRateRule not found with ID: " + id);
        }
    }

    public Optional<Pair<LocalTime>> getShiftTimeRange(Shift shift) {
        Parameter lastParameter = parameterRepository.findLastParameter();
        switch (shift) {
            case Daytime:
                return Optional.of(new Pair<LocalTime>(
                    lastParameter.getNightShiftEnd(),
                    lastParameter.getNightShiftStart()
                ));
            case Nightime:
                return Optional.of(new Pair<LocalTime>(
                    lastParameter.getNightShiftStart(),
                    lastParameter.getNightShiftEnd()
                ));
            default: return Optional.empty();
        }
    }
}