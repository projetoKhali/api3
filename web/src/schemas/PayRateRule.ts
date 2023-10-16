export interface PayRateRuleSchema {
    id: number,
    code: number,
    appointmentType: string,
    // shift refere-se a se é diurno ou noturno
    shift: string,
    daysOfWeek: boolean[],
    minHourCount: number,
    hourDuration: number,
    payRate: number,
    overlap: boolean,
    expireDate: string,
}
export interface PostPayRateRuleSchema {
    code: number,
    appointmentType: string,
    // shift refere-se a se é diurno ou noturno
    shift: string,
    daysOfWeek: boolean[],
    minHourCount: number,
    hourDuration: number,
    payRate: number,
    overlap: boolean,
    
}
