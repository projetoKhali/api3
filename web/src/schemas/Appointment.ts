export interface Appointment {
    user: string,
    appointmentType: string,
    startDate: string,
    endDate: string,
    resultCenter: string,
    client: string,
    project: string,
    justification: string,
    status: string,
}

export interface PostAppointment {
    user:{
        id: string
    }
    appointmentType: string,
    startDate: string,
    endDate: string,
    resultCenter: {
        id: string
    }
    client: {
        id: string
    }
    project: string,
    justification: string
}

