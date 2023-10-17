import axios from 'axios';
import { PayRateRuleSchema, PostPayRateRuleSchema } from '../schemas/PayRateRule';

const API_URL = 'http://127.0.0.1:8080/payRateRules';

export async function getPayRateRules (): Promise<PayRateRuleSchema[]> {
    const response = await axios.get(API_URL, {});
    return await response.data.map((item: any) => ({
        id: item.id,
        code: item.code? item.code : "N/A",
        appointmentType: item.appointmentType? item.appointmentType : "N/A",
        shift: item.shift? item.shift : "N/A",
        daysOfWeek: item.daysOfWeek ? item.daysOfWeek : [],
        minHourCount: item.minHourCount? item.minHourCount : "N/A",
        hourDuration: item.hourDuration? item.hourDuration : "N/A",
        payRate: item.payRate? item.payRate : "N/A",
        overlap: item.overlap? item.overlap : "N/A",
        expireDate: item.expireDate? item.expireDate : "N/A",
    })) as PayRateRuleSchema[];
}

export async function postPayRateRule(payRateRule: PostPayRateRuleSchema) {
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
    return await fetch(`${API_URL}/${payRateRule.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(payRateRule)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
}

export function validatePayRateRules (payRateRules: PayRateRuleSchema[]): boolean {
    for (const payRateRuleResult of payRateRules.map(
        payRateRule => {
            for (const otherPayRateRule of payRateRules) {
                if (payRateRule.overlap || otherPayRateRule.overlap) continue;
                if (payRateRule.shift != otherPayRateRule.shift) continue;
                for (const dayOfWeekIndex in payRateRule.daysOfWeek) {
                    const dayOfWeek = payRateRule.daysOfWeek[dayOfWeekIndex];
                    if (dayOfWeek && dayOfWeek == otherPayRateRule.daysOfWeek[dayOfWeekIndex]) return false;
                }
                return false;
            }
            return true;
        }
    )) {
        if (!payRateRuleResult) return false;
    }
    return true;
}

export async function postPayRateRules (
    previousPayRateRules: PayRateRuleSchema[],
    payRateRules: PayRateRuleSchema[],
) {
    return await Promise.all(
        payRateRules.map(
            payRateRule => {
                for (const previousPayRateRule of previousPayRateRules) {
                    if (payRateRule.code != previousPayRateRule.code) continue;
                    return updatePayRateRule(payRateRule);
                }
                return postPayRateRule(payRateRule);
            }
        )
    );
}
