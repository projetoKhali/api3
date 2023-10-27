package com.khali.api3.domain.slice;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Slice {
    private Appointment appointment;
    private PayRateRule payRateRule;
    private Timestamp start;
    private Timestamp end;

    public static Slice fromAppointment (Appointment appointment) {
        return new Slice(
            appointment,
            null,
            appointment.getStartDate(),
            appointment.getEndDate()
        );
    }
}
