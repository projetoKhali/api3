package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.resultCenter.ResultCenter;

@RepositoryRestResource
public interface ResultCenterRepository extends JpaRepository<ResultCenter, Long>{
    public ResultCenter findByCode(String code);
    
   
    
}
