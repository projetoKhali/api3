export interface AppointmentSchema {
    requester: string,
    type: string,
    startDate: string,
    endDate: string,
    resultCenter: {
        id: number
    },
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
    resultCenter: {
        id: number,
    },
    client: number,
    project: string,
}

