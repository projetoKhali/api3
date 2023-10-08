package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.project.Project;

@RepositoryRestResource
public interface ProjectRepository extends JpaRepository<Project, Long>{
    
    default void saveProject(Project prj){
        save(prj);
    }
}