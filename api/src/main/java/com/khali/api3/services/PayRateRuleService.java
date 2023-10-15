package com.khali.api3.services;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.repositories.PayRateRuleRepository;

@Service
public class PayRateRuleService {
    
    @Autowired
    private PayRateRuleRepository payRateRuleRepository;


    public PayRateRule updatePayRateRule(Long id, PayRateRule newPayRateRule){
        PayRateRule payRateRuleExists = payRateRuleRepository.findById(id).orElse(null);
        
        if (payRateRuleExists != null) {
            if (newPayRateRule.getCode() != null) {
                payRateRuleExists.setCode(newPayRateRule.getCode());
            }

            if (newPayRateRule.getHourDuration() != 0.0) {
                payRateRuleExists.setHourDuration(newPayRateRule.getHourDuration());
            }

            if (newPayRateRule.getPayRate() != 0.0) {
                payRateRuleExists.setPayRate(newPayRateRule.getPayRate());
            }

            if (newPayRateRule.getAppointmentType() != null) {
                payRateRuleExists.setAppointmentType(newPayRateRule.getAppointmentType());
            }

            if (newPayRateRule.getDaysOfWeek() != null) {
                payRateRuleExists.setDaysOfWeek(newPayRateRule.getDaysOfWeek());
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



}

