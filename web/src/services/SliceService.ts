import axios, { AxiosResponse } from 'axios';
import { SliceSchema } from '../schemas/Slice';

const API_URL = 'http://127.0.0.1:8080/slices';
const API_URL2 = 'http://127.0.0.1:8080';

// Função para exportar os dados para CSV
export async function exportSlicesToCSV(camposBoolean: boolean[], userId: number): Promise<void> {
    const exportURL = `${API_URL2}/csv-export?camposBoolean=${camposBoolean.join(',')}&usr_id=${userId}`;
    
    // Utilize a biblioteca axios para fazer a solicitação de exportação para CSV
    return axios.get(exportURL, { responseType: 'blob' })
        .then((response) => {
            // Crie um objeto Blob com os dados da resposta
            const blob = new Blob([response.data], { type: 'text/csv' });
            
            // Crie um URL temporário para o Blob
            const url = window.URL.createObjectURL(blob);
            
            // Crie um elemento 'a' para o download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'exported_report.csv';
            document.body.appendChild(a);
            
            // Inicie o download
            a.click();
            
            // Libere o URL temporário
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error('Erro na exportação para CSV:', error);
        });
}

function serializeSlice(slice: any): SliceSchema {
    return {
        appointment: slice.appointment ? slice.appointment : "N/A",
        payRateRule: slice.payRateRule ? slice.payRateRule : "N/A",
        start: slice.start ? slice.start : "N/A",
        end: slice.end ? slice.end : "N/A",
    }
}

async function mapResponse(response: AxiosResponse) {
    return response.data.map((item: any) => serializeSlice(item));
}

export async function getSlices(): Promise<SliceSchema[]> {
    const response = await axios.get(API_URL, {});
    return await mapResponse(response);
}
