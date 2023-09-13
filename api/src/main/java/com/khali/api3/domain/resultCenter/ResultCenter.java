package com.khali.api3.domain.resultCenter;

import java.sql.Timestamp;

import com.khali.api3.domain.user.User;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity(name="resultCenters")
@Table(name="resultCenters")
@AllArgsConstructor
@Getter
@Setter
public class ResultCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    @Column(unique=true)
    private String code;
    
    @Column(unique=true)
    private String acronym;

    @ManyToOne
    @JoinColumn(name="gestor_id", referencedColumnName = "id")
    private User gestor;

    private Timestamp insertDate;
}
