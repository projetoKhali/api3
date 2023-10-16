package com.khali.api3.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.member.Member;
import com.khali.api3.repositories.MembersRepository;

@RestController
@RequestMapping("/members")
public class MemberController {
    @Autowired private final MembersRepository membersRepository;

    public MemberController(MembersRepository membersRepository) {
        this.membersRepository = membersRepository;
    }

    @GetMapping
    public List<Member> getAllMembers() {
        return membersRepository.findAll();
    }

    @PostMapping
    public Member createMember (@RequestBody Member member) {
        return membersRepository.save(member);
    }

    @PostMapping("/multi")
    public List<Member> createMembers (@RequestBody List<Member> members) {
        return members.stream().filter(
            member -> membersRepository.save(member) != null
        ).collect(Collectors.toList());
    }
}
