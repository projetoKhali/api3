export interface AppointmentSchema {
    user:{
        id: number,
    },
    type: string,
    startDate: string,
    endDate: string,
    resultCenter: {
        id: number,
    },
    client: {
        id: number,
    },
    project: string,
    justification: string,
    status: string,
}

export interface PostAppointmentSchema {
    user:{
        id: number,
    },
    resultCenter: {
        id: number,
    },
    client: {
        id: number,
    },
    type: string,
    startDate: string,
    endDate: string,
    project: string,
    justification: string
}
