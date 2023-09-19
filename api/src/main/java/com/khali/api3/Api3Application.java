package com.khali.api3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Api3Application {

	public static void main(String[] args) {
		SpringApplication.run(Api3Application.class, args);
		// ConfigurableApplicationContext context = SpringApplication.run(Api3Application.class, args);

        // ClientService clientService = context.getBean(ClientService.class);
		// UserService userService = context.getBean(UserService.class);
		// ResultCenterService rcService = context.getBean(ResultCenterService.class);
		// MembersService membersService = context.getBean(MembersService.class);

		// Client cliente = new Client();
        // cliente.setCnpj("44.434.444/041-48");
        // cliente.setName("Judite's company7");
		// User user = new User();
		// user.setRegistration("500");
		// user.setName("Teste");
		// // userService.saveUser(user);
		// ResultCenter resultCenter = new ResultCenter();
		// resultCenter.setCode("4w3U2");
		// resultCenter.setGestor(user);
		// System.out.println("matricula do gestor: "+ (rcService.findResultCenterByCode("14")).getGestor().getRegistration());
		// User temqsercarloszika = userService.saveUser(user);
		// System.out.println("user: " + user.getId() + " | temqsercarloszika: " + temqsercarloszika.getId());
		// rcService.saveResultCenter(resultCenter);
		// clientService.saveClient(cliente);
		// clientService.deleteClientByCnpj("44.444.444/002-45");
		// User user2 = userService.findUserByRegistration("13");
		// ResultCenter rc2 = rcService.findResultCenterByCode("14");

		// System.out.println("user2: " + user2.getId() + " | " + rc2.getId());
		
		// membersService.insertMember(user2, rc2);
		


		
		// context.close();

		
	}
}
