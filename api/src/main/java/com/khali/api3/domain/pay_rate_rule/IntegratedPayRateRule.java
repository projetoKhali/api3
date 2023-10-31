package com.khali.api3.domain.pay_rate_rule;

import java.sql.Timestamp;

import com.khali.api3.domain.util.Pair;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class IntegratedPayRateRule {
    private PayRateRule payRateRule;
    private Pair<Timestamp> timeRange;
}
