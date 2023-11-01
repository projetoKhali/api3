package com.khali.api3.domain.resultCenter;

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
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Setter;

@Entity(name="resultcenter")
@Table(name="result_centers")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class ResultCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="rc_id")
    private Long id;

    private String name;

    @Column(unique=true)
    private Integer code;

    @Column(unique=true)
    private String acronym;

    @ManyToOne
    @JoinColumn(name="gst_id", referencedColumnName = "usr_id")
    private User gestor;

    @Column(name = "insert_date")
    private Timestamp insertDate;
}
