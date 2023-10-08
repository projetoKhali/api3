package com.khali.api3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
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

    
}
