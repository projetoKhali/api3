import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.khali.api3.domain.client.Client;
import com.khali.api3.repositories.ClientRepository;
import com.khali.api3.services.ClientService;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class JPAtests {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ClientService clientService;

    @Test
    public void testSalvarCliente() {
        // Criando um novo cliente
        Client cliente = new Client();
        cliente.setCnpj("44.444.444/001-44");
        cliente.setName("Judite's company");;

        // Salve o cliente no banco de dados usando o repositório
        clientService.saveClient(cliente);
        // Client clienteSalvo = clientRepository.saveClient(cliente);        
            
        

       
    }
}