package com.khali.api3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.khali.api3.domain.client.Client;
import com.khali.api3.repositories.ClientRepository;

@SpringBootApplication
public class Api3Application {

	@Autowired
    static private ClientRepository clientRepository;

	public static void main(String[] args) {
		SpringApplication.run(Api3Application.class, args);

		Client cliente = new Client();
        cliente.setCnpj("44.444.444/001-44");
        cliente.setName("Judite's company");

		
	}
}
