package com.khali.api3.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.core.userdetails.UserDetails;

import com.khali.api3.domain.user.User;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long>{
    public User findByRegistration(String registration);
    public Optional<User> findByEmail(String email);
}