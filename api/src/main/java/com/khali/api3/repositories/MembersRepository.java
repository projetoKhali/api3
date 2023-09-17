package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.member.Member;
import com.khali.api3.domain.member.MemberPrimaryData;

@RepositoryRestResource
public interface MembersRepository extends JpaRepository<Member, MemberPrimaryData>{
    //public List<Member> findByUser(User user);
    //public List<Member> findByResultCenter(ResultCenter resultCenter);
<<<<<<< HEAD
    
    
=======
>>>>>>> origin/telas
}
