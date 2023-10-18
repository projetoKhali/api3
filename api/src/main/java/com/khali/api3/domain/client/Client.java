package com.khali.api3.domain.client;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="clients")
@Table(name="clients")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clt_id")
    private Long id;

    @Column
    private String name;

    @Column(unique=true)
    private String cnpj;

    @Transient
    @Column(name = "insert_date")
    private Timestamp insertDate;

    @Column(name = "expire_date")
    private Timestamp expiredDate;
}
