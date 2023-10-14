package com.khali.api3.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.resultCenter.ResultCenter;
import com.khali.api3.domain.user.User;


@RepositoryRestResource
public interface ResultCenterRepository extends JpaRepository<ResultCenter, Long>{
    public ResultCenter save(String resultCenter);
    public void delete(ResultCenter resultCenter);
    public ResultCenter findByCode(String code);
    public List<ResultCenter> findByGestor(User gestor);
}
