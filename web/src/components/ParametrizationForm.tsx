import { useEffect, useState } from "react";
import { PostParameterSchema } from "../schemas/Parametrization";
import { postParameter } from "../services/ParametrizationService";

interface ParametrizationFormProps {
    successCallback: () => void;
    errorCallback: () => void;
}

export default function ParametrizationForm ({successCallback, errorCallback}: ParametrizationFormProps) {
    const [postNightShiftStart, setNightShiftStart] = useState<string>('');
    const [postNightShiftEnd, setNightShiftEnd] = useState<string>('');
    const [postClosingDayOfMonth, setClosingDayOfMonth] = useState<number | string>('');

    function handleNightShiftStartChange(event: React.ChangeEvent<HTMLInputElement>){ setNightShiftStart(event.target.value); }
    function handleNightShiftEndChange(event: React.ChangeEvent<HTMLInputElement>){ setNightShiftEnd(event.target.value); }
    function handlePostClosingDayOfMonthChange(event: React.ChangeEvent<HTMLInputElement>){ 
        const inputValue = event.target.value;
        const intValue = parseInt(inputValue, 10);
        if (!isNaN(intValue)) {
            setClosingDayOfMonth(intValue);
        } else {
            setClosingDayOfMonth("");
        }
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        if (!postNightShiftStart || !postNightShiftEnd || !postClosingDayOfMonth) {
            console.log("Hello, world!");
            return errorCallback ();
        }
        
        event.preventDefault();
        
        const formattedNightShiftStart = formatTime (postNightShiftStart);
        const formattedNightShiftEnd = formatTime (postNightShiftEnd);
        
        postParameter({
            nightShiftStart: formattedNightShiftStart,
            nightShiftEnd: formattedNightShiftEnd,
            closingDayOfMonth: postClosingDayOfMonth,
          } as PostParameterSchema)
          .then(() => successCallback());
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Inicio do Período Noturno" onChange={handleNightShiftStartChange}/>
            <input type="text" placeholder="Fim do Período Noturno" onChange={handleNightShiftEndChange}/>
            <input type="text" placeholder="Dia de Fechamento" onChange={handlePostClosingDayOfMonthChange}/>
            <button type="submit">Salvar</button>
        </form>
    );
        
}

function formatTime(hora: string): string | null {
    const regex = /^(0?[0-9]|1[0-9]|2[0-3])(:?[0-5][0-9])?$/;
    if (!regex.test(hora)) {
        console.error('Formato de hora inválido. Use o formato de 0 a 23.');
        return null;
    }

    const horaFormatada = hora.padEnd(2, '0') + ':00';
    return horaFormatada;
      
}
