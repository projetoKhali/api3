import { AppointmentSchema } from "./Appointment";
import { PayRateRuleSchema } from "./PayRateRule";

export interface SliceSchema {
    appointment: AppointmentSchema,
    payRateRule: PayRateRuleSchema,
    start: string,
    end: string,
}
