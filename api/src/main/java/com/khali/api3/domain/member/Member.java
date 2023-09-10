package com.khali.api3.domain.member;

import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.domain.user.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity(name="member")
@Table(name="member")
@AllArgsConstructor
@Getter
@Setter
public class Member {

    @Id
    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;
    
    @Id
    @ManyToOne
    @JoinColumn(name="cr_id", referencedColumnName = "id")
    private ResultCenter resultCenter;

    
}
