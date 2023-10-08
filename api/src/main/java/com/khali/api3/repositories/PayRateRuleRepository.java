package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import java.util.List;
import java.util.Optional;


@RepositoryRestResource
public interface PayRateRuleRepository extends JpaRepository<PayRateRule, Long>{
    public PayRateRule save(PayRateRule payRateRule);
    public void delete(Long id);
    public void deletePayRateRuleById(Long id);
    public List<PayRateRule> findAll();
    public List<PayRateRule> findByCode(Long code); 
    public Optional<PayRateRule> findById(Long id); 

   

   
}
