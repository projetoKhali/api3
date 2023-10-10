package com.khali.api3.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.client.Client;

@RepositoryRestResource
public interface ClientRepository extends JpaRepository<Client, Long>{
    public Client findByCnpj(String cnpj);

    @Query(value = "SELECT * FROM clients c WHERE c.expire_date != NULL", nativeQuery = true)
    public List<Client> findAllActive();
}
