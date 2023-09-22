package com.khali.api3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.khali.api3.domain.client.Client;
import com.khali.api3.services.ClientService;


@SpringBootApplication
public class Api3Application {

	public static void main(String[] args) {
		SpringApplication.run(Api3Application.class, args);
		ConfigurableApplicationContext context = SpringApplication.run(Api3Application.class, args);

		// Obtenha uma instância do serviço ClientService
        ClientService clientService = context.getBean(ClientService.class);
		
		Client cliente = new Client();
        cliente.setCnpj("44.444.444/001-48");
        cliente.setName("Judite's company3");
		// clientService.saveClient(cliente);
		clientService.deleteClientByCnpj("44.444.444/001-45");
		context.close();

		
	}
}
