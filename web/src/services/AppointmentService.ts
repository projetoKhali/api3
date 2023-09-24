import axios from 'axios';
import { Appointment, PostAppointment } from '../schemas/Appointment';

const API_URL = 'http://127.0.0.1:8080/appointments';

export async function getAppointments (): Promise<Appointment[]> {
    const response = await axios.get(API_URL, {});
    return await response.data.map((item: any) => ({
        requester: item.requester? item.requester : "N/A",
        type: item.type? item.type : "N/A",
        startDate: item.startDate? item.startDate : "N/A",
        endDate: item.endDate? item.endDate : "N/A",
        resultCenter: item.resultCenter? item.resultCenter : "N/A",
        client: item.client? item.client : "N/A",
        project: item.project? item.project : "N/A",
        justification: item.justification? item.justification : "N/A",
        status: item.status? item.status : "N/A",
        // insertDate: item.insertDate? item.insertDate : "N/A",
    })) as Appointment[];
}

export async function postAppointment(appointment: PostAppointment){
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(appointment)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
    
}
