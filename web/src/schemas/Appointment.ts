export interface AppointmentSchema {
    requester: string,
    type: string,
    startDate: string,
    endDate: string,
    resultCenter: string,
    client: string,
    project: string,
    justification: string,
    status: string,
}

export interface PostAppointmentSchema {
    requester: number,
    type: string,
    startDate: string,
    endDate: string,
    resultCenter: number,
    client: number,
    project: string,
}

