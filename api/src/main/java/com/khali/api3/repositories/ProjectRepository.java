package com.khali.api3.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.project.Project;

@RepositoryRestResource
public interface ProjectRepository extends JpaRepository<Project, Long>{

    

    public Optional<Project> findById(Long id);
    public Project findByName(String name);
    public Project findByDescription(String description);
    public List<Project> findAll();

    @Query(value = "SELECT * FROM projects where expire_date is null", nativeQuery = true)
    public List<Project> findAllActiveProjects();

}