package com.khali.api3.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.member.Member;
import com.khali.api3.domain.member.MemberPrimaryData;
import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.domain.user.User;
import com.khali.api3.repositories.MembersRepository;

@Service
public class MembersService {
    @Autowired
    private MembersRepository membersRepository;

    public List<Member> getAllMembers(){
        return membersRepository.findAll();
    }

    public Member saveMember (Member member) {
        return membersRepository.save(member);
    }

    public List<Member> getMembersByUser(User user){
        List<Member> userMembers = new ArrayList<>();
        List<Member> allMembers = membersRepository.findAll();
        for(Member member: allMembers){
            if ((member.getMemberPK()).getUser() == user){
                userMembers.add(member);
            }
        }
        return userMembers;

    }

    public List<Member> getMembersByUserId(long id){
        List<Member> userMembers = new ArrayList<>();
        List<Member> allMembers = membersRepository.findAll();
        for (Member member : allMembers) {
            if ((member.getMemberPK().getUser().getId()) == id) {
                userMembers.add(member);
            }
        }
        return userMembers;
    }

    public void alterMembersStatus(List<Member> members, boolean status){
        if (status) {
            for (Member member : members) {
                member.setActive(true);
                membersRepository.save(member);
            }
        } else {
            for (Member member : members) {
                member.setActive(false);
                membersRepository.save(member);
            }
        }
    }

    public List<Member> getMembersByRC(ResultCenter resultCenter){
        List<Member> userMembers = new ArrayList<>();
        List<Member> allMembers = membersRepository.findAll();
        for(Member member: allMembers){
            if ((member.getMemberPK()).getResultCenter() == resultCenter){
                userMembers.add(member);
            }
        }
        return userMembers;
    }

    public Member insertMember(User user, ResultCenter resultCenter){
        MemberPrimaryData memberPK = new MemberPrimaryData(user, resultCenter);
        Member member = new Member();
        member.setMemberPK(memberPK);
        System.out.println(user.getId()+" | "+resultCenter.getId());
        return membersRepository.save(member);
    }
}
