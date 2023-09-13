import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.khali.api3.Api3Application;
import com.khali.api3.domain.pay_rate_rule.PayRateRule;
import com.khali.api3.domain.pay_rate_rule.Week;
import com.khali.api3.services.PayRateRuleService;

public class PayRateRuleTest {
    @Test
    public void testaPayRate(){
		ConfigurableApplicationContext context = SpringApplication.run(Api3Application.class, args);

		PayRateRuleService payRateRuleService = context.getBean(PayRateRuleService.class);
		
		PayRateRule pay =  new PayRateRule();
        pay.setId(pay.getId());
		Week week = Week.Qua;
		pay.setDaysOfWeek(week);
        payRateRuleService.savePayRateRule(pay);
        payRateRuleService.getPayRateRuleByID(pay);
    }
}
