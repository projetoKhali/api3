import { useEffect, useState } from "react";
import { PostPayRateRuleSchema } from "../schemas/PayRateRule";
import { postPayRateRule } from "../services/PayRateRulesService";
import { Checkbox } from "antd";

interface PopupFormProps {
    successCallback: () => void;
    errorCallback: () => void;
}

export default function PopupForm({ successCallback, errorCallback }: PopupFormProps) {
    const [postCode, setCode] = useState<number | string>('');
    const [postAppointmentType, setAppointmentType] = useState<string>('');
    const [postShift, setShift] = useState<string>('');
    // const [postWeekend, setWeekend] = useState<string>('');
    const [postMinHourCount, setMinHourCount] = useState<number | string>('');
    const [postHourDuration, setHourDuration] = useState<number | string>('');
    const [postPayRate, setPayRate] = useState<number | string>('');
    const [postOverlap, setOverlap] = useState<boolean>(false);


    function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) { setCode(event.target.value); }
    function handleAppointmentTypeChange(event: React.ChangeEvent<HTMLInputElement>) { setAppointmentType(event.target.value); }
    function handleShiftChange(event: React.ChangeEvent<HTMLInputElement>) { setShift(event.target.value); }
    // function handleWeekendChange(event: React.ChangeEvent<HTMLInputElement>){ setWeekend(event.target.value); }
    function handleMinHourCountChange(event: React.ChangeEvent<HTMLInputElement>) { setMinHourCount(event.target.value); }
    function handleHourDurationChange(event: React.ChangeEvent<HTMLInputElement>) { setHourDuration(event.target.value); }
    function handlePayRateChange(event: React.ChangeEvent<HTMLInputElement>) { setPayRate(event.target.value); }
    function handleOverlapChange(event: React.ChangeEvent<HTMLInputElement>) { setOverlap(event.target.checked); }


    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        if (!postCode || !postAppointmentType || !postShift || !postMinHourCount
            || !postHourDuration || !postPayRate || !postOverlap) {
            console.log("Hello, world!");
            // return errorCallback ();
        }

        console.log("Hello, world!2");
        event.preventDefault();

        postPayRateRule({
            code: postCode,
            appointmentType: postAppointmentType,
            // shift refere-se a se é diurno ou noturno
            shift: postShift,
            // weekend: postWeekend,
            minHourCount: postMinHourCount,
            hourDuration: postHourDuration,
            payRate: postPayRate,
            overlap: postOverlap,
        } as PostPayRateRuleSchema)
            .then(() => successCallback());
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Codigo" onChange={handleCodeChange} />
            <input type="text" placeholder="Tipo" onChange={handleAppointmentTypeChange} />
            <input type="text" placeholder="Periodo" onChange={handleShiftChange} />
            {/* <input type="text" placeholder="Fim de Semana" onChange={handleWeekendChange}/> */}
            <input type="text" placeholder="Mínimo de horas" onChange={handleMinHourCountChange} />
            <input type="text" placeholder="Duração da hora" onChange={handleHourDurationChange} />
            <input type="text" placeholder="Porcentagem" onChange={handlePayRateChange} />
            <p>
                <Checkbox

                    checked={postOverlap}
                    onChange={()=>setOverlap(!postOverlap)} />
                Aceitar Sobreposição

            </p>


            <button type="submit">Salvar</button>

        </form>
    );

}

