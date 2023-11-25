import axios from 'axios';
import { ClientSchema } from '../schemas/Client';

const API_URL = 'http://127.0.0.1:8080/clients';

export async function getClients (): Promise<ClientSchema[]> {
    const response = await axios.get(API_URL, {});
    return await response.data.map((item: any) => ({
        id: item.id.toString(), 
        name: item.name? item.name : "N/A",
        cnpj: item.cnpj? item.cnpj : "N/A",
        // active: item.active? item.active : "N/A",
        // insertDate: item.insertDate? item.insertDate : "N/A",
        // expireDate: item.expireDate? item.expireDate : "N/A",
    })) as ClientSchema[];
}

export async function postClient(user: ClientSchema) {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response=> response.json())
    .catch(error => console.error(error));
    
}
