package com.khali.api3.domain.appointment;

import com.khali.api3.domain.user.User;
import com.khali.api3.domain.client.Client;
import com.khali.api3.domain.resultCenter.ResultCenter;

import java.sql.Timestamp;
import java.util.Date;

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
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    private AppointmentType type;

    private Timestamp startDate;
    private Timestamp endDate;
    private Timestamp insertDate;

    @ManyToOne
    @JoinColumn(name="rc_id", referencedColumnName = "id")
    private ResultCenter resultCenter;

    @ManyToOne
    @JoinColumn(name="client_id", referencedColumnName = "id")
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
