export interface PayRateRuleSchema {
    id: number,
    code: number,
    type: string,
    // shift refere-se a se é diurno ou noturno
    shift: string,
    weekend: string,
    minHourCount: number,
    hourDuration: number,
    percentage: number,
    overlap: boolean,
    expireDate: string,
}
export interface PostPayRateRuleSchema {
    code: number,
    type: string,
    // shift refere-se a se é diurno ou noturno
    shift: string,
    weekend: string,
    minHourCount: number,
    hourDuration: number,
    percentage: number,
    overlap: boolean,
    
}