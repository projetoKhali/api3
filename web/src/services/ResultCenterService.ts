import axios, { AxiosResponse } from 'axios';
import { PostResultCenterSchema, ResultCenterSchema } from '../schemas/ResultCenter';

import { UserSchema } from '../schemas/User';

const API_URL = `${process.env.BACKEND_URL}/resultCenters`;


async function mapResponse (response: AxiosResponse) {
    return response.data.map((item: any) => ({
        id: item.id,
        name: item.name? item.name : "N/A",
        code: item.code? item.code : "N/A",
        acronym: item.acronym? item.acronym : "N/A",
        gestor: item.gestor? item.gestor.name : "N/A",
        insertDate: item.insertDate? item.insertDate : "N/A",
    })) as ResultCenterSchema[]
}

export async function getResultCenters (): Promise<ResultCenterSchema[]> {
    const response = await axios.get(API_URL, {});
    return await mapResponse(response);
}

export async function getResultCentersOfUser (user: UserSchema): Promise<ResultCenterSchema[]> {
    const userId = user.id;
    const response = await axios.get(`${API_URL}/of/${userId}`, {});
    return await mapResponse(response);
}

export async function postResultCenter(resultCenter: PostResultCenterSchema) {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(resultCenter)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
}
