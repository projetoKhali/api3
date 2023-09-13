package com.khali.api3.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.repositories.PayRateRuleRepository;

@Service
public class PayRateRuleService {
    
    @Autowired
    private PayRateRuleRepository payRateRuleRepository;

    public PayRateRule savePayRateRule(PayRateRule payRateRule) {
        return payRateRuleRepository.save(payRateRule);
    }
    
    public List<PayRateRule> getPayRateRule(){
        return payRateRuleRepository.findAll();
    }

    public PayRateRule getPayRateRuleByID(Long id){
        return payRateRuleRepository.findById(id).orElse(null);
    }

    public PayRateRule updatePayRateRule(Long id, PayRateRule newPayRateRule){
        PayRateRule payRateRuleExists = payRateRuleRepository.findById(id).orElse(null);
        
        if (payRateRuleExists != null) {
            if (newPayRateRule.getCode() != null) {
                payRateRuleExists.setCode(newPayRateRule.getCode());
            }

            if (newPayRateRule.getAppointmentType() != null) {
                payRateRuleExists.setAppointmentType(newPayRateRule.getAppointmentType());
            }

            if (newPayRateRule.getDaysOfWeek() != null) {
                payRateRuleExists.setDaysOfWeek(newPayRateRule.getDaysOfWeek());
            }

            if (newPayRateRule.getEndTime() != null) {
                payRateRuleExists.setEndTime(newPayRateRule.getEndTime());
            }

            if (newPayRateRule.getStartTime() != null) {
                payRateRuleExists.setStartTime(newPayRateRule.getStartTime());
            }

            if (newPayRateRule.getHourDuration() != 0.0) {
                payRateRuleExists.setHourDuration(newPayRateRule.getHourDuration());
            }

            if (newPayRateRule.getPayRate() != 0.0) {
                payRateRuleExists.setPayRate(newPayRateRule.getPayRate());
            }

            return payRateRuleRepository.save(payRateRuleExists);
        } else {
            throw new NoSuchElementException("PayRateRule not found with ID: " + id);
        }
    }



}

