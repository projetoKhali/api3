package com.khali.api3.domain.appointment;

import java.sql.Timestamp;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
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
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private int userId;

    @Enumerated(EnumType.STRING)
    private AppointmentType type;

    private Timestamp startDate;
    private Timestamp endDate;

    @ManyToOne
    @JoinColumn(name="rc_id")
    private int resultCenterId;

    @ManyToOne
    @JoinColumn(name="client_id")
    private int clientId;

    private String project;
    private String justification;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private String feedback;
}
