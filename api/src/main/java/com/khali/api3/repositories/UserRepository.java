package com.khali.api3.repositories;

import java.util.Optional;
// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.user.User;
// import com.khali.api3.domain.user.UserType;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long>{

    public Optional<User> findById(Long id);

    // @Query(value = "SELECT * FROM users u WHERE u.user_type = :user_type", nativeQuery = true)
    // public List<User> findByUserType(@Param("user_type") UserType userType);

    public User findByRegistration(String registration);

    @Query(value = "SELECT * FROM users a WHERE a.name = :name", nativeQuery = true)
    String findUserByName(@Param("name") User userName);

    @Query(value = "select * from users where email = :email", nativeQuery = true)
    public User findByEmail(String email);
}
