package com.khali.api3.domain.pay_rate_rule;

import java.sql.Timestamp;
import java.util.Optional;

import com.khali.api3.domain.util.Pair;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class IntegratedPayRateRule {
    private PayRateRule payRateRule;
    private Optional<Pair<Timestamp>> timeRange;
}
