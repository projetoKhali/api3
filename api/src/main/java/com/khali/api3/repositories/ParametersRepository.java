package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.parameter.Parameter;

@RepositoryRestResource
public interface ParametersRepository extends JpaRepository<Parameter, Long> {

    @Query(value = "SELECT * FROM parameters ORDER BY insert_date DESC LIMIT 1;", nativeQuery = true)
    Parameter findLastParameter();

}
