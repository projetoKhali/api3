package com.khali.api3.domain.pay_rate_rule;

import java.time.LocalTime;

import com.khali.api3.domain.appointment.AppointmentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
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

    @Column(name="code", unique=true)
    private Long code;

    @Column(name = "hour_duration")
    private Double hourDuration;

    @Column(name = "min_hour_count")
    private Double minHourCount;

    @Column(name = "pay_rate")
    private Double payRate;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_type")
    private AppointmentType appointmentType;

    // @Enumerated(EnumType.STRING)
    // @Column(name = "days_of_week")
    // private Week daysOfWeek;

    @Enumerated(EnumType.STRING)
    @Column(name = "period")
    private Shift shift;
   
    @Column(name = "overlap")
    private Boolean overlap;   
    
    @Column(name = "expire_date")
    private Timestamp expire_date;   
}
