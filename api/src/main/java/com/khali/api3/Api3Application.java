package com.khali.api3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.khali.api3.domain.client.Client;
import com.khali.api3.repositories.ClientRepository;
import com.khali.api3.services.ClientService;

import io.micrometer.observation.Observation.Context;

@SpringBootApplication
public class Api3Application {

	// @Autowired
    // private ClientRepository clientRepository;
	// @Autowired
	// static private ClientService clientService;
	

	public static void main(String[] args) {
		// SpringApplication.run(Api3Application.class, args);
		ConfigurableApplicationContext context = SpringApplication.run(Api3Application.class, args);

		// Obtenha uma instância do serviço ClientService
        ClientService clientService = context.getBean(ClientService.class);
		
		Client cliente = new Client();
        cliente.setCnpj("44.444.444/001-44");
        cliente.setName("Judite's company");
		clientService.saveClient(cliente);
		context.close();

		
	}
}
