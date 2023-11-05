package com.khali.api3.domain.notification;

import com.khali.api3.domain.appointment.AppointmentStatus;
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

@Entity
@Table(name = "notifications")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apt_id")
    private Long aptId;

    @ManyToOne
    @JoinColumn(name = "usr_id")
    private User userId;

    @Column(name = "status")
    private boolean status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private AppointmentStatus type;

   
}
