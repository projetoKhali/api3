export interface PayRateRuleSchema {
    id: number,
    code: number,
    type: string,
    // shift refere-se a se é diurno ou noturno
    shift: boolean,
    weekend: string,
    minHourCount: number,
    hourDuration: number,
    percentage: number,
    overlap: boolean,
    expireDate: string,
}