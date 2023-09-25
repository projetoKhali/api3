package com.khali.api3.domain.appointment;

import java.sql.Timestamp;

import com.khali.api3.domain.client.Client;
import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.domain.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
    @JoinColumn(name="usr_id", referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_type")
    private AppointmentType appointmentType;

    private Timestamp startDate;
    private Timestamp endDate;
    private Timestamp insertDate;

    @ManyToOne
    @JoinColumn(name="rc_id")
    private ResultCenter resultCenter;

    @ManyToOne
    @JoinColumn(name="clt_id", referencedColumnName = "id")
    private Client client;

    private String project;
    private String justification;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    private String feedback;

    @OneToOne
    @JoinColumn(name="apt_updt_id", referencedColumnName = "id")
    private Appointment apt_updt;
}
