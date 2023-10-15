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
    project: {
        id: number,
    },
    justification: string,
    status: string,
}

export interface PostAppointmentSchema {
    user: {
        id: number,
    },
    appointmentType: string,
    resultCenter: {
        id: number,
    },
    client: {
        id: number,
    },
    type: string,
    startDate: string,
    endDate: string,
    project: {
        id: number,
    },
    justification: string
}

