package com.khali.api3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.client.Client;
import com.khali.api3.repositories.ClientRepository;

@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;

    public Client saveClient (Client cliente) {
        return clientRepository.save(cliente);
    }

    
    
}
