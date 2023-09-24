package com.khali.api3.domain.resultCenter;

import java.sql.Timestamp;

import com.khali.api3.domain.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity(name="resultcenter")
@Table(name="resultcenters")

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
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
