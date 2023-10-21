package com.khali.api3.domain.member;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="members")
@Table(name="members")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Member {
    @EmbeddedId
    private MemberPrimaryData memberPK;

    @Column(name="active")
    boolean active;

    @Column(name = "insert_date", insertable = false, updatable = false)
    Timestamp insertdate;
}
