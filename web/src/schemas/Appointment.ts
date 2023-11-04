export interface AppointmentSchema {
    id: number,
    user:{
        id: number,
        name: string
    },
    type: string,
    startDate: string,
    endDate: string,
    resultCenter: {
        id: number,
        name: string,
    },
    client: {
        id: number,
        name: string,
    },
    project: {
        id: number,
        name: string,
    },
    justification: string,
    feedback: string
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

export interface AppointmentUserSchema {
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
    project: string,
    justification: string,
    feedback: string
    status: string,
}
