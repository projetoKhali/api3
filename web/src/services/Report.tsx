import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/csv-export';

export async function getReport(
    camposBoolean: boolean[],
    usrId: number
) {
    const camposBooleanString = camposBoolean.map(value => value.toString()).join(',');

    const params = {
        camposBoolean: camposBooleanString,
        usr_id: usrId,
    };

    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}