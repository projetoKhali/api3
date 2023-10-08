package com.khali.api3.controllers;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public Project createProject(@RequestBody Project prj){
        return projectRepository.save(prj);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, Project prj){
        Project project = projectRepository.findById(id).get();
        project.setName(prj.getName());
        project.setDescription(prj.getDescription());
        return projectRepository.save(project);
    }

    @PutMapping("/deactivate/{id}")
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

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id){
        return projectRepository.findById(id).get();
    }

    @GetMapping("/name/{name}")
    public Project getProjectByName(@PathVariable String name){
        return projectRepository.findByName(name);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects(){
        return projectRepository.findAll();
    }
}
