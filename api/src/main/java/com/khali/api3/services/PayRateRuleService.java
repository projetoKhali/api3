package com.khali.api3.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.repositories.PayRateRuleRepository;

@Service
public class PayRateRuleService {
    
    @Autowired
    private PayRateRuleRepository PayRateRuleRepository;

    public PayRateRule savePayRateRule(PayRateRule payRateRule) {
        return PayRateRuleRepository.save(payRateRule);
    }
    public List<PayRateRule> getPayRateRule(PayRateRule payRateRule){
        return PayRateRuleRepository.findAll();
    }
    public PayRateRule insertPayRateRule(PayRateRule payRateRule){
        return PayRateRuleRepository.save(payRateRule);
    }
    public Optional<PayRateRule> getPayRateRuleByID(PayRateRule payRateRule){
        System.out.println(PayRateRuleRepository.findById(payRateRule.getId()));
        return PayRateRuleRepository.findById(payRateRule.getId());
    }

}

