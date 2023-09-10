package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.member.Member;

@RepositoryRestResource
public interface MembersRepository extends JpaRepository<Member, Long>{
    
}
