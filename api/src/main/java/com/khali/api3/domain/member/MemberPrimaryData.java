package com.khali.api3.domain.member;

import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.domain.user.User;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class MemberPrimaryData {
    @Id
    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;
    
    @Id
    @ManyToOne
    @JoinColumn(name="cr_id", referencedColumnName = "id")
    private ResultCenter resultCenter;
    
}
