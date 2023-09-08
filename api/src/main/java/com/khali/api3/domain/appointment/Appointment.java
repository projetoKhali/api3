package com.khali.api3.domain.appointment;

import java.sql.Timestamp;

import com.khali.api3.domain.client.Client;
import com.khali.api3.domain.resultCenter.ResultCenter;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="appointments")
@Table(name="appointments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long apt_id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name="appointment_type")
    private AppointmentType type;

    private Timestamp startDate;
    private Timestamp endDate;

    @ManyToOne
    @JoinColumn(name="rc_id")
    private ResultCenter resultCenterId;

    @ManyToOne
    @JoinColumn(name="client_id")
    private Client clt_id;

    private String project;
    private String justification;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private String feedback;
}
