package com.khali.api3.controllers;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.project.Project;
import com.khali.api3.repositories.ProjectRepository;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    
    @Autowired private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @PostMapping
    public void saveProject(Project prj){
        projectRepository.save(prj);
    }

    @PutMapping("/desactivate/{id}")
    public Project desactivateProject(@PathVariable Long id){
        Project prj = projectRepository.findById(id).get();
        prj.setActive(false);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        prj.setExpireDate(now);
        return projectRepository.save(prj);
    }

    @PutMapping("/activate/{id}")
    public Project activateProject(@PathVariable Long id){
        Project prj = projectRepository.findById(id).get();
        prj.setActive(true);
        prj.setExpireDate(null);
        return projectRepository.save(prj);
    }
}
