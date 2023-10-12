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
        if (!postNightShiftStart || !postNightShiftEnd || !postClosingDayOfMonth) {return errorCallback ();}
        
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
        </form>
    );
        
}

function formatTime(dateTimeStr: string): string {
    return `${dateTimeStr}:00}`
    
}
