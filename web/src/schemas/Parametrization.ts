export interface ParameterSchema {
    id: number,
    nightShiftStart: string,
    nightShiftEnd: string,
    closingDayOfMonth: number,   
    insertDate: string,
}

export interface PostParameterSchema {
    nightShiftStart: string,
    nightShiftEnd: string,
    closingDayOfMonth: number,   
}