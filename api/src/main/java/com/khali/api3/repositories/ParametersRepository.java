package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.parameter.Parameter;

@RepositoryRestResource
public interface ParametersRepository extends JpaRepository<Parameter, Long>{
    public Parameter save(Parameter parameter);

}
