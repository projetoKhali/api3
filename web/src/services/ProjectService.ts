import axios, { AxiosResponse } from 'axios';
import { ProjectSchema } from '../schemas/Project';

const API_URL = 'http://127.0.0.1:8080/projects';


async function mapResponse (response: AxiosResponse) {
    return response.data.map((item: any) => ({
        name: item.name? item.name : "N/A",
    })) as ProjectSchema[]
}

export async function getResultCenters (): Promise<ProjectSchema[]> {
    const response = await axios.get(API_URL, {});
    return await mapResponse(response);
}

export async function postProject(project: ProjectSchema) {
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
