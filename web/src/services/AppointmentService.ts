import axios, { AxiosResponse } from 'axios';
import { AppointmentSchema, PostAppointmentSchema } from '../schemas/Appointment';

const API_URL = `${process.env.BACKEND_URL}/appointments`;

async function mapResponse(response: AxiosResponse): Promise<AppointmentSchema[]> {
    return response.data.map((item: any) => ({
        user: item.id? item.id : -1,
        type: item.type? item.type : "N/A",
        startDate: item.startDate ? formatDateTime(item.startDate) : "N/A",
        endDate: item.endDate ? formatDateTime(item.endDate) : "N/A",
        resultCenter: item.resultCenter? item.resultCenter.name : "N/A",
        client: item.client? item.client.name : "N/A",
        project: item.project? item.project : "N/A",
        justification: item.justification? item.justification : "N/A",
        status: item.status? item.status : "N/A",
        // insertDate: item.insertDate? item.insertDate : "N/A",
    })) as AppointmentSchema[]
}

export async function getAppointmentsUser (id: number): Promise<AppointmentSchema[]> {
    const response = await axios.get(`${API_URL}/user/${id}`, {});
    return await mapResponse(response);
}

export async function getAppointmentsAdm () : Promise<AppointmentSchema[]> {
    const response = await axios.get(`${API_URL}`, {});
    return await mapResponse(response);
}

export async function getAppointmentsManager(id: number): Promise<AppointmentSchema[]> {
    const response = await axios.get(`${API_URL}/manager/${id}`, {});
    return await mapResponse(response);
}

export async function postAppointment (appointment: PostAppointmentSchema){
    return await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(appointment)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
}

function formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const formattedDate = date.getUTCDate().toString().padStart(2, '0') + '/' +
    (date.getUTCMonth() + 1).toString().padStart(2, '0') + '/' +
    date.getUTCFullYear();
    const formattedTime = date.getUTCHours().toString().padStart(2, '0') + ':' +
    date.getUTCMinutes().toString().padStart(2, '0') + ':' +
    date.getUTCSeconds().toString().padStart(2, '0');
    return `${formattedDate} ${formattedTime}`;
}
