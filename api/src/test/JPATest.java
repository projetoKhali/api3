import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.khali.api3.Api3Application;
import com.khali.api3.domain.client.Client;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.repositories.ClientRepository;
import com.khali.api3.repositories.PayRateRuleRepository;
import com.khali.api3.services.ClientService;
import com.khali.api3.services.PayRateRuleService;

@DataJpaTest
@SpringBootTest
public class JPATest {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ClientService clientService;
    @Autowired
    private PayRateRuleRepository payRateRuleRepository;
    @Autowired
    private PayRateRuleService payRateRuleService;

    @Test
    public void SalvarClienteTest() {
        // Criando um novo cliente
        Client cliente = new Client("test");
        cliente.setCnpj("44.444.444/001-41");
        cliente.setName("Venceslau");;

        // Salve o cliente no banco de dados usando o repositório
        clientService.saveClient(cliente);
        // Client clienteSalvo = clientRepository.saveClient(cliente);
        assertNotNull(cliente.getId());       
     
            
        

       
    }
    @Test
    public void testGetPayRate(){
        PayRateRule pay =  new PayRateRule();
        pay.setId(1);
        pay.setAppointmentType("hour");
        payRateRuleService.savePayRateRule(pay);
        payRateRuleService.getPayRateRuleByID(1);

    }


}