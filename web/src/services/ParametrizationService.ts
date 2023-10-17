import axios from 'axios';
import { ParameterSchema, PostParameterSchema } from '../schemas/Parametrization';

const API_URL = 'http://127.0.0.1:8080/parameters';

function serializeParameters (item: any): ParameterSchema {
    return {
        id: item.id.toString(), 
        nightShiftStart: item.nightShiftStart? item.nightShiftStart : "N/A",
        nightShiftEnd: item.nightShiftEnd? item.nightShiftEnd : "N/A",
        closingDayOfMonth: item.closingDayOfMonth? item.closingDayOfMonth : "N/A",
        insertDate: item.insertDate? item.insertDate : "N/A",
    }
}

export async function getParameters (): Promise<ParameterSchema[]> {
    const response = await axios.get(API_URL, {});
    return await response.data.map(
        (item: any) => serializeParameters(item)
    ) as ParameterSchema[];
}

export async function getLatestParameter (): Promise<ParameterSchema> {
    const response = await axios.get(`${API_URL}/latest`, {});
    return serializeParameters(response.data);
}

export async function postParameter(parameter: PostParameterSchema) {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(parameter)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
    
}
