export interface AppointmentSchema {
    user:{
        id: number,
    },
    appointmentType: string,
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
    resultCenter: {
        id: number,
    },
    client: {
        id: number,
    },
    appointmentType: string,
    startDate: string,
    endDate: string,
    project: {
        id: number,
    },
    justification: string
}

