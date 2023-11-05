package com.khali.api3.domain.slice;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Setter;

import com.khali.api3.domain.util.Pair;
import com.khali.api3.domain.appointment.Appointment;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class ProtoSlice {
    private Appointment appointment;
    private PayRateRule payRateRule;
    private Timestamp start;
    private Timestamp end;
    private Long previousHours;
    private Boolean lock; // prevent this slice's payRateRule from changing

    public static ProtoSlice fromAppointment (Appointment appointment) {
        return new ProtoSlice(
            appointment,
            null,
            appointment.getStartDate(),
            appointment.getEndDate(),
            0L,
            false
        );
    }

    public static ProtoSlice fromPair (
        Appointment appointment,
        Pair<Timestamp> pair,
        PayRateRule payRateRule,
        Long previousHours,
        Boolean lock
    ) {
        return new ProtoSlice(
            appointment,
            payRateRule,
            pair.x,
            pair.y,
            previousHours,
            lock
        );
    }
}
