package com.khali.api3.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.repositories.PayRateRuleRepository;
import com.khali.api3.services.PayRateRuleService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/payRateRules")
public class PayRateRuleController {
    private final PayRateRuleService payRateRuleService;
    private final PayRateRuleRepository payRateRuleRepository;

    public PayRateRuleController(@Autowired PayRateRuleService payRateRuleService, @Autowired PayRateRuleRepository payRateRuleRepository) {
        this.payRateRuleService = payRateRuleService;
        this.payRateRuleRepository = payRateRuleRepository;
    }

    @GetMapping
    public List<PayRateRule> getAllPayRateRules() {
        return payRateRuleRepository.findAll();
    }

    @GetMapping("/id/{id}")
    public PayRateRule getPayRateRuleById(@PathVariable Long id) {
        return payRateRuleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("PayRateRule not found with id: " + id));
    }
    @GetMapping("/code/{code}")
    public List<PayRateRule> getPayRateRuleByCode(@PathVariable Long code) {
        List<PayRateRule> payRateRules = payRateRuleRepository.findByCode(code);
        if (payRateRules.isEmpty()) {System.out.print("não há verba com o código: " + code);}
        return payRateRuleRepository.findByCode(code);
    }

    @PostMapping
    public PayRateRule createPayRateRule(@RequestBody PayRateRule payRateRule) {
        // inserir aqui lógica do overlapping
        return payRateRuleRepository.save(payRateRule);
    }
    

    @PutMapping("/{id}")
    public PayRateRule updatePayRateRule(@PathVariable Long id, @RequestBody PayRateRule payRateRuleDetails) {
        return payRateRuleService.updatePayRateRule(id, payRateRuleDetails);
    }
    
}
