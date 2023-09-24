package com.khali.api3.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.repositories.ResultCenterRepository;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/resultCenters")
public class ResultCenterController {
    private final ResultCenterRepository resultCenterRepository;

    public ResultCenterController(@Autowired ResultCenterRepository resultCenterRepository) {
        this.resultCenterRepository = resultCenterRepository;
    }

    @GetMapping
    public List<ResultCenter> getAllResultCenters() {
        return resultCenterRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResultCenter getResultCenterById(@PathVariable Long id) {
        return resultCenterRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ResultCenter not found with id: " + id));
    }

    @PostMapping
    public ResultCenter createResultCenter(@RequestBody ResultCenter resultCenter) {
        return resultCenterRepository.save(resultCenter);
    }

    @PutMapping("/{id}")
    public ResultCenter updateResultCenter(@PathVariable Long id, @RequestBody ResultCenter resultCenterDetails) {
        ResultCenter resultCenter = resultCenterRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ResultCenter not found with id: " + id));

        // Update the resultCenter object with the details from the request body
        resultCenter.setCode(resultCenterDetails.getCode());
        // Update other fields as needed

        return resultCenterRepository.save(resultCenter);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResultCenter(@PathVariable Long id) {
        resultCenterRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}