import { useEffect, useState } from "react";
import { PostPayRateRuleSchema } from "../schemas/PayRateRule";
import { postPayRateRule } from "../services/PayRateRulesService";

interface PopupFormProps {
    successCallback: () => void;
    errorCallback: () => void;
}

export default function PopupForm ({successCallback, errorCallback}: PopupFormProps) {
    const [postCode, setCode] = useState<number | string>('');
    const [postType, setType] = useState<string>('');
    const [postShift, setShift] = useState<string>('');
    const [postWeekend, setWeekend] = useState<string>('');
    const [postMinHourCount, setMinHourCount] = useState<number | string>('');
    const [postHourDuration, setHourDuration] = useState<number | string>('');
    const [postPercentage, setPercentage] = useState<number | string>('');
    const [postOverlap, setOverlap] = useState<boolean>(false);


    function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>){ setCode(event.target.value); }
    function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>){ setType(event.target.value); }
    function handleShiftChange(event: React.ChangeEvent<HTMLInputElement>){ setShift(event.target.value); }
    function handleWeekendChange(event: React.ChangeEvent<HTMLInputElement>){ setWeekend(event.target.value); }
    function handleMinHourCountChange(event: React.ChangeEvent<HTMLInputElement>){ setMinHourCount(event.target.value); }
    function handleHourDurationChange(event: React.ChangeEvent<HTMLInputElement>){ setHourDuration(event.target.value); }
    function handlePercentageChange(event: React.ChangeEvent<HTMLInputElement>){ setPercentage(event.target.value); }
    function handleOverlapChange(event: React.ChangeEvent<HTMLInputElement>){ setOverlap(event.target.checked); }
    
    
    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        if (!postCode || !postType || !postShift || !postWeekend || !postMinHourCount 
            || !postHourDuration || !postPercentage || !postOverlap) {
            console.log("Hello, world!");
            return errorCallback ();
        }
        
        event.preventDefault();

        postPayRateRule({
            code: postCode,
            type: postType,
            // shift refere-se a se é diurno ou noturno
            shift: postShift,
            weekend: postWeekend,
            minHourCount: postMinHourCount,
            hourDuration: postHourDuration,
            percentage: postPercentage,
            overlap: postOverlap,
          } as PostPayRateRuleSchema)
          .then(() => successCallback());
    }

    const [open, setOpen] = useState<boolean>(false);

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Codigo" onChange={handleCodeChange}/>
            <input type="text" placeholder="Tipo" onChange={handleTypeChange}/>
            <input type="text" placeholder="Periodo" onChange={handleShiftChange}/>
            <input type="text" placeholder="Fim de Semana" onChange={handleWeekendChange}/>
            <input type="text" placeholder="Mínimo de horas" onChange={handleMinHourCountChange}/>
            <input type="text" placeholder="Duração da hora" onChange={handleHourDurationChange}/>
            <input type="text" placeholder="Porcentagem" onChange={handlePercentageChange}/>
            <input type="text" placeholder="Cumulativo" onChange={handleOverlapChange}/>
            <button type="submit">Salvar</button>
            
        </form>
    );
        
}

