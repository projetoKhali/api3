import axios, { AxiosResponse } from 'axios';
import { PostProjectSchema, ProjectSchema } from '../schemas/Project';

const API_URL = 'http://127.0.0.1:8080/projects';


async function mapResponse (response: AxiosResponse) {
    return response.data.map((item: any) => ({
        id: item.id? item.id : "N/A",
        name: item.name? item.name : "N/A",
        description: item.description? item.description : "N/A",
        active: item.expire_date? "Inativo" : "Ativo",
        insertDate: item.insertDate? formatDateTime(item.insertDate) : "N/A",
        expireDate: item.expireDate? formatDateTime(item.expireDate) : "N/A",
    })) as ProjectSchema[]
}

export async function getProject (): Promise<ProjectSchema[]> {
    const response = await axios.get(`${API_URL}`, {});
    return await mapResponse(response);
}

export async function postProject(project: PostProjectSchema) {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(project)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
}

function formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const formattedDate = date.getUTCDate().toString().padStart(2, '0') + '/' +
    (date.getUTCMonth() + 1).toString().padStart(2, '0') + '/' +
    date.getUTCFullYear();
    return `${formattedDate}`;
}
