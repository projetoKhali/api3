package com.khali.api3.domain.report;

import java.sql.Timestamp;

import com.khali.api3.domain.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="report")
@Table(name="report")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Report {
    
    public Report(String json, int id) {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rp_id")
    @Null
    private Long id;

    @Column(name = "reportData")
    private String jsonString;

    @ManyToOne
    @JoinColumn(name="usr_id", referencedColumnName = "usr_id")
    private User user;

    @Column(name = "insert_date", insertable = false, updatable = false)
    @Null
    private Timestamp insertDate;
}
