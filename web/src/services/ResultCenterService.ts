import axios, { AxiosResponse } from 'axios';
import { PostResultCenterSchema, ResultCenterSchema } from '../schemas/ResultCenter';

import { UserSchema } from '../schemas/User';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/resultCenters`;


function serializeResultCenter (resultCenter: any): ResultCenterSchema {
    return {
        id: resultCenter.id,
        name: resultCenter.name? resultCenter.name : "N/A",
        code: resultCenter.code? resultCenter.code : "N/A",
        acronym: resultCenter.acronym? resultCenter.acronym : "N/A",
        gestor: resultCenter.gestor? resultCenter.gestor.name : "N/A",
        insertDate: resultCenter.insertDate? resultCenter.insertDate : "N/A",
    }
}

async function mapResponse (response: AxiosResponse) {
    return response.data.map((item) => serializeResultCenter(item));
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
    .then((data)=> {
        console.log(data);
        return serializeResultCenter(data);
    })
    .catch(error => console.error(error));
}
