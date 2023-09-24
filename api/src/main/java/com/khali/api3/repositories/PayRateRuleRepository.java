package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.pay_rate_rule.PayRateRule;

@RepositoryRestResource
public interface PayRateRuleRepository extends JpaRepository<PayRateRule, Long>{
   
}
