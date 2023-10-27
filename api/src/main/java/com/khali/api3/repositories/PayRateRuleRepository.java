package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import java.util.List;
import java.util.Optional;


@RepositoryRestResource
public interface PayRateRuleRepository extends JpaRepository<PayRateRule, Long>{
    public PayRateRule save(PayRateRule payRateRule);
    public List<PayRateRule> findAll();
    public List<PayRateRule> findByCode(Long code); 
    public Optional<PayRateRule> findById(Long id); 

    @Query(value = "select * from pay_rate_rules where active = true and overlap = true", nativeQuery = true)
    public List<PayRateRule> findCumulative ();
   
    @Query(value = "select * from pay_rate_rules where active = true and min_hour_count > 0", nativeQuery = true)
    public List<PayRateRule> findMinHourCount ();
}
