import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.khali.api3.domain.client.Client;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.repositories.ClientRepository;
import com.khali.api3.repositories.PayRateRuleRepository;
import com.khali.api3.services.ClientService;
import com.khali.api3.services.PayRateRuleService;

@DataJpaTest
public class JPAtests {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ClientService clientService;
    @Autowired
    private PayRateRuleRepository payRateRuleRepository;
    @Autowired
    private PayRateRuleService payRateRuleService;

    @Test
    public void testSalvarCliente() {
        // Criando um novo cliente
        Client cliente = new Client();
        cliente.setCnpj("44.444.444/001-44");
        cliente.setName("Venceslau");;

        // Salve o cliente no banco de dados usando o repositório
        clientService.saveClient(cliente);
        // Client clienteSalvo = clientRepository.saveClient(cliente);        
            
        

       
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