package com.khali.api3.services;

import java.util.List;

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
        //System.out.println(payRateRuleRepository.findById(payRateRule.getId()));
        return payRateRuleRepository.findById(id).orElse(null);
    }

}

