package com.khali.api3.domain.slice;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Setter;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Slice {
    private Appointment appointment;
    private PayRateRule payRateRule;
    private Timestamp start;
    private Timestamp end;
}
