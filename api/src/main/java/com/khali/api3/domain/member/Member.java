package com.khali.api3.domain.member;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="member")
@Table(name="member")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Member {
    @EmbeddedId
    private MemberPrimaryData memberPK;
}
