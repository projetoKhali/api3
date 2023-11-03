package com.khali.api3.domain.parameter;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;

import java.sql.Timestamp;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name="parameters")
@Table(name="parameters")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Parameter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="prm_id")
    private Long id;

    @Column(name = "insert_date", insertable = false, updatable = false)
    private Timestamp insert_date;

    @Column (name = "closing_day")
    private Long closingDayOfMonth;

    @Column (name = "start_night_time")
    private LocalTime nightShiftStart;

    @Column (name = "end_night_time")
    private LocalTime nightShiftEnd;
    
}
