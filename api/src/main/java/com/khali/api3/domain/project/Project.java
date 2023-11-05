package com.khali.api3.domain.project;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Setter;

@Entity(name="projects")
@Table(name="projects")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
    @ToString
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="prj_id")
    private Long id;

    @Column
    @JsonProperty("name")
    private String name;

    @Column
    private String description;

    @Column(name = "insert_date", insertable = false, updatable = false)
    private Timestamp insertDate;

    @Column(name = "expire_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp expireDate;


}
