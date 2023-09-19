import axios from 'axios';
import ResultCenterData from '../models/ResultCenterData';

const API_URL = 'http://127.0.0.1:8080/resultcenters';

export interface PostResultCenterData {
    name: string,
    code: string,
    acronym: string,
    insertDate: string
}

export async function getResultCenters (): Promise<ResultCenterData[]> {
    const response = await axios.get(API_URL, {});
    return await response.data.map((item: any) => ({
        key: item.id.toString(),
        name: item.name? item.name : "N/A",
        code: item.code? item.code : "N/A",
        acronym: item.acronym? item.acronym : "N/A",
        email: {
            name: item.name? item.name : "N/A",
            referencedColumnName: item.referencedColumnName ? item.referencedColumnName : "N/A",
        },
        insertDate: item.insertDate? item.insertDate : "N/A",
    })) as ResultCenterData[];
}

export async function postResultCenter(resultCenter: PostResultCenterData){
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
