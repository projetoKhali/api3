package com.khali.api3.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.client.Client;
import com.khali.api3.domain.member.Member;
<<<<<<< HEAD
import com.khali.api3.domain.member.MemberPrimaryData;
import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.domain.user.User;
=======
>>>>>>> origin/telas
import com.khali.api3.repositories.MembersRepository;

@Service
public class MembersService {
    @Autowired
    private MembersRepository membersRepository;

    public List<Member> getAllMembers(){
        return membersRepository.findAll();
    }

<<<<<<< HEAD
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
        Member member = new Member(memberPK);
        System.out.println(user.getId()+" | "+resultCenter.getId());
=======
    // public List<Member> getMembersByUser(User user){
    //     return membersRepository.findByUser(user);
    // }
    
    // public List<Member> getMembersByResultCenter(ResultCenter resultCenter){
    //     return membersRepository.findByResultCenter(resultCenter);
    // }

    public Member insertMember(Member member){
>>>>>>> origin/telas
        return membersRepository.save(member);
    }
}
