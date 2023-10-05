package com.khali.api3.domain.pay_rate_rule;

import com.khali.api3.domain.appointment.AppointmentType;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Entity(name="pay_rate_rules")
@Table(name="pay_rate_rules")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class PayRateRule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="prt_id")
    private Long id;

    @Column(unique=true)
    private Long code;

    @Column
    private double hourDuration;
    @Column
    private double payRate;

    @Enumerated(EnumType.STRING)
    private AppointmentType appointmentType;

    @Column
    private LocalTime startTime;
    @Column
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    private Week daysOfWeek;

}
