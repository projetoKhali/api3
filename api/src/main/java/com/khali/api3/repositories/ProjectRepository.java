package com.khali.api3.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.project.Project;

@RepositoryRestResource
public interface ProjectRepository extends JpaRepository<Project, Long>{

    

    public Optional<Project> findById(Long id);
    public Project findByName(String name);
    public Project findByDescription(String description);
    public List<Project> findAll();

    public default Project createProject(String name, String description) {
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        return save(project);
    }
    
}