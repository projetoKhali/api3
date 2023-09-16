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
	}
}
