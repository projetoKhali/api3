package com.khali.api3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.khali.api3.domain.client.Client;
import com.khali.api3.repositories.ClientRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;

    public Client saveClient (Client cliente) {
        return clientRepository.save(cliente);
    }
    
    public Client findClientByCnpj (String cnpj) {
        return clientRepository.findByCnpj(cnpj);
    }

    public void deleteClient (Client cliente) {
        clientRepository.delete(cliente);
    }
    
    public void deleteClientByCnpj(String cnpj) {
        Client cliente = clientRepository.findByCnpj(cnpj);
        if (cliente != null) {
            deleteClient(cliente);
        } else {
            // Lida com o caso em que o cliente com o CNPJ especificado não foi encontrado
            throw new EntityNotFoundException("Cliente não encontrado com o CNPJ: " + cnpj);
        }
    }
}
