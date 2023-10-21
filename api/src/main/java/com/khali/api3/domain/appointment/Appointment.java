package com.khali.api3.domain.appointment;

import java.sql.Timestamp;

import com.khali.api3.domain.client.Client;
import com.khali.api3.domain.project.Project;
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
    @Column(name="apt_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="usr_id", referencedColumnName = "usr_id")
    private User user;

    @Column(name = "appointment_type")
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
    @JoinColumn(name="clt_id", referencedColumnName = "clt_id")
    private Client client;
    
    @ManyToOne
    @JoinColumn(name="prj_id", referencedColumnName = "prj_id")
    private Project project;
    @Column
    private String justification;

    @Column(name = "status", insertable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    @Column
    private String feedback;
    
    @Column(name = "active", insertable = false, updatable = false)
    private boolean active;

    @Column(name = "apt_updt_id")
    private Long apt_updt;
}
