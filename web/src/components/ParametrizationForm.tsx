import { useEffect, useState } from "react";
import { PostParameterSchema } from "../schemas/Parametrization";
import { postParameter } from "../services/ParametrizationService";

interface ParametrizationFormProps {
    handleNightShiftStartChange: () => void;
    handleNightShiftEndChange: () => void;
    handlePostClosingDayOfMonthChange: () => void;   
}



export default function ParametrizationForm ({
    handleNightShiftStartChange,
    handleNightShiftEndChange,
    handlePostClosingDayOfMonthChange
}: ParametrizationFormProps) {
          
    return (
        <form >
            <input type="text" placeholder="Inicio do Período Noturno" onChange={handleNightShiftStartChange}/>
            <input type="text" placeholder="Fim do Período Noturno" onChange={handleNightShiftEndChange}/>
            <input type="text" placeholder="Dia de Fechamento" onChange={handlePostClosingDayOfMonthChange}/>
            
            
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
