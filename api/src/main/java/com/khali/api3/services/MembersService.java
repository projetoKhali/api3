package com.khali.api3.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.member.Member;
import com.khali.api3.repositories.MembersRepository;

@Service
public class MembersService {
    @Autowired
    private MembersRepository membersRepository;

    public List<Member> getAllMembers(){
        return membersRepository.findAll();
    }

    public Member getMemberById(Long id){
        return membersRepository.findById(id).orElse(null);
    }

    public Member insertMember(Member member){
        return membersRepository.save(member);
    }
    
    public Member updateMember(Long id, Member newMemberProps){
        Member memberExists = membersRepository.findById(id).orElse(null);
        if (memberExists != null){
            if(newMemberProps.getResultCenter() != null){
                memberExists.setResultCenter(newMemberProps.getResultCenter());
            }

            if(newMemberProps.getUser() != null){
                memberExists.setUser(newMemberProps.getUser());
            }
        
            return membersRepository.save(memberExists);
        } else {
            throw new NoSuchElementException("Member not found with ID: " + id);
        }
    }

}
