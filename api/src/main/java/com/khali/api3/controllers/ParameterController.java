package com.khali.api3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.khali.api3.domain.parameter.Parameter;
import com.khali.api3.repositories.ParametersRepository;

@RestController
@RequestMapping("/parameters")
public class ParameterController {

    @Autowired private final ParametersRepository parameterRepository;
    public ParameterController(@Autowired ParametersRepository parameterRepository){
        this.parameterRepository = parameterRepository;
    }

    @PostMapping
    public Parameter createParameter(@RequestBody Parameter parameter) {
        return parameterRepository.save(parameter);
    }

}
