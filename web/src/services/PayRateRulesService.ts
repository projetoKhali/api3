import axios from 'axios';
import { PayRateRuleSchema } from '../schemas/PayRateRule';

const API_URL = 'http://127.0.0.1:8080/payRateRules';

export async function getPayRateRules (): Promise<PayRateRuleSchema[]> {
    const response = await axios.get(API_URL, {});
    return await response.data.map((item: any) => ({
        key: item.id.toString(), 
        code: item.code? item.code : "N/A",
        type: item.type? item.type : "N/A",
        shift: item.shift? item.shift : "N/A",
        weekend: item.weekend? item.weekend : "N/A",
        minHourCount: item.minHourCount? item.minHourCount : "N/A",
        hourDuration: item.hourDuration? item.hourDuration : "N/A",
        percentage: item.percentage? item.percentage : "N/A",
        overlap: item.overlap? item.overlap : "N/A",
        expireDate: item.expireDate? item.expireDate : "N/A",
    })) as PayRateRuleSchema[];
}

export async function postPayRateRule(payRateRule: PayRateRuleSchema) {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(payRateRule)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
   
}

export async function updatePayRateRule(payRateRule: PayRateRuleSchema) {
    return await fetch(API_URL, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(payRateRule)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
    
}
