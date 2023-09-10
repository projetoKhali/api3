package com.khali.api3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.khali.api3.domain.client.Client;

@RepositoryRestResource
public interface ClientRepository extends JpaRepository<Client, Long>{
    public Client findByCnpj(String cnpj);
   
    
}
