import React from "react";

interface ParametrizationFormProps {
    setNightShiftStart: (value: string) => void;
    setNightShiftEnd: (value: string) => void;
    setPostClosingDayOfMonth: (value: number) => void;
}

export default function ParametrizationForm ({
    setNightShiftStart,
    setNightShiftEnd,
    setPostClosingDayOfMonth
}: ParametrizationFormProps) {


    function handleNightShiftStartChange (event: React.ChangeEvent<HTMLInputElement>) {
        setNightShiftStart(event.target.value);
    }
    function handleNightShiftEndChange (event: React.ChangeEvent<HTMLInputElement>) {
        setNightShiftEnd(event.target.value);
    }
    function handlePostClosingDayOfMonthChange (event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const intValue = parseInt(inputValue, 10);
        if (!isNaN(intValue)) {
            setPostClosingDayOfMonth(intValue);
        }
    }

    return (
        <form >
            <input type="text" placeholder="Inicio do Período Noturno" onChange={handleNightShiftStartChange}/>
            <input type="text" placeholder="Fim do Período Noturno" onChange={handleNightShiftEndChange}/>
            <input type="text" placeholder="Dia de Fechamento" onChange={handlePostClosingDayOfMonthChange}/>
        </form>
    );
}
