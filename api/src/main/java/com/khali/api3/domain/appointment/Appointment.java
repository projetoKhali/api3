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
    private Long id;

    @ManyToOne
    @JoinColumn(name="usr_id", referencedColumnName = "id")
    private User user;

    @Column
    @Enumerated(EnumType.STRING)
    private AppointmentType type;

    @Column
    private Timestamp startDate;
    @Column
    private Timestamp endDate;
    @Column
    private Timestamp insertDate;

    @ManyToOne
    @JoinColumn(name="rc_id")
    private ResultCenter resultCenter;

    @ManyToOne
    @JoinColumn(name="clt_id", referencedColumnName = "id")
    private Client client;

    private String project;
    @Column
    private String justification;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    @Column
    private String feedback;

    @OneToOne
    @JoinColumn(name="apt_updt_id", referencedColumnName = "id")
    private Appointment apt_updt;
}
