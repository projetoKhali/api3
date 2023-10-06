package com.khali.api3.domain.member;

import java.io.Serializable;
import java.util.Objects;

import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.domain.user.User;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class MemberPrimaryData implements Serializable{
    @ManyToOne
    @JoinColumn(name="usr_id", referencedColumnName = "usr_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name="cr_id", referencedColumnName = "cr_id")
    private ResultCenter resultCenter;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MemberPrimaryData that = (MemberPrimaryData) o;

        return Objects.equals(user, that.user) && Objects.equals(resultCenter, that.resultCenter);
    }

    @Override
    public int hashCode() {
        System.out.println("hashCode: "+ user.getId());
        return Objects.hash(user, resultCenter);
    }
    
}
