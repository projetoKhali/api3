import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.khali.api3.domain.client.Client;
import com.khali.api3.repositories.ClientRepository;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class JPAtests {

    @Autowired
    private ClientRepository clientRepository;

    @Test
    public void testSalvarCliente() {
        // Criando um novo cliente
        Client cliente = new Client();
        cliente.setCnpj("44.444.444/001-44");
        cliente.setName("Judite's company");;

        // Salve o cliente no banco de dados usando o repositório
        Client clienteSalvo = clientRepository.saveClient(cliente);        
            
        

        // Verifique se o cliente foi salvo com sucesso
        assertNotNull(clienteSalvo.getId()); // Assumindo que o ID é gerado automaticamente
        assertEquals("Nome do Cliente", clienteSalvo.getNome());
        assertEquals("cliente@email.com", clienteSalvo.getEmail());
    }
}