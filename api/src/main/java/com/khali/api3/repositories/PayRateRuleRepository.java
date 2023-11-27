package com.khali.api3.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.pay_rate_rule.PayRateRule;


@RepositoryRestResource
public interface PayRateRuleRepository extends JpaRepository<PayRateRule, Long> {
    public List<PayRateRule> findAll();
    public List<PayRateRule> findByCode(Long code);
    public Optional<PayRateRule> findById(Long id);

    @Query(value = "select * from pay_rate_rules where expire_date is null and overlap = true", nativeQuery = true)
    public List<PayRateRule> findCumulative();

    @Query(value = "select * from pay_rate_rules where expire_date is null and min_hour_count > 0", nativeQuery = true)
    public List<PayRateRule> findMinHourCount();

    @Query(value = "select * from pay_rate_rules where expire_date is null and overlap = false and min_hour_count = 0", nativeQuery = true)
    public List<PayRateRule> findDefault();
}
