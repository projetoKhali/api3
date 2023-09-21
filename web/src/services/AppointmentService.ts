import axios from 'axios';
import AppointmentData from '../shared/AppointmentData';

const API_URL = 'http://127.0.0.1:8080/Appointments';

export interface PostAppointmentData {
    type: string;
    startDate: string;
    endDate: string;
    resultCenter: string;
}

export async function getAppointments () : Promise<AppointmentData[]> {
    const response = await axios.get(API_URL, {});
    return await response.data.map((item: any) => ({
        key: item.id.toString(),
        user: item.user? item.user : "N/A",
        type: item.type? item.name : "N/A",
        startDate: item.startDate? item.startDate : "N/A",
        endDate: item.endDate? item.endDate : "N/A",
        insertDate: item.insertDate? item.insertDate : "N/A",
        resultCenter: item.resultCenter? item.resultCenter : "N/A",
        client: item.client? item.client : "N/A",
        project: item.project? item.project : "N/A",
        justification: item.justification? item.justification : "N/A",
        status: item.status? item.status : "N/A",
        feedback: item.feedback? item.feedback : "N/A",
        updateAppointment: item.updateAppointment? item.updateAppointment : "N/A",
    })) as AppointmentData[];

    
}

export async function postAppointment(appointment: PostAppointmentData) {
    return await fetch(API_URL, {
        method: 'POST',
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify(appointment)
}).then(response=> response.json())
.then((data) => console.log(data))
.catch(error => console.log(error));
    
}