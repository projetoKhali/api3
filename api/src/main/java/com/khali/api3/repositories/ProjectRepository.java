package com.khali.api3.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.project.Project;

@RepositoryRestResource
public interface ProjectRepository extends JpaRepository<Project, Long>{

    

    public Optional<Project> findById(Long id);
    public Project findByName(String name);
    public Project findByDescription(String description);
    public List<Project> findAll();

    @Modifying
    @Query(value = "INSERT INTO projects (name, description) VALUES (:name, :description)", nativeQuery = true)
    int insertProject(@Param("name") String name, @Param("description") String description);

}