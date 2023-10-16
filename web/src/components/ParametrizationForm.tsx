import React from "react";

interface ParametrizationFormProps {
    setNightShiftStart: (value: string) => void;
    getNightShiftStart: string;
    setNightShiftEnd: (value: string) => void;
    getNightShiftEnd: string;
    setPostClosingDayOfMonth: (value: number) => void;
    getPostClosingDayOfMonth: number;
}

export default function ParametrizationForm ({
    setNightShiftStart,
    getNightShiftStart,
    setNightShiftEnd,
    getNightShiftEnd,
    setPostClosingDayOfMonth,
    getPostClosingDayOfMonth
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
            <input
                type="text"
                placeholder="Inicio do Período Noturno"
                value={getNightShiftStart}
                onChange={handleNightShiftStartChange}
            />
            <input
                type="text"
                placeholder="Fim do Período Noturno"
                value={getNightShiftEnd}
                onChange={handleNightShiftEndChange}
            />
            <input
                type="text"
                placeholder="Dia de Fechamento"
                value={getPostClosingDayOfMonth}
                onChange={handlePostClosingDayOfMonthChange}
            />
        </form>
    );
}
