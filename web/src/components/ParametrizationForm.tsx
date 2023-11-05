import React, { useEffect, useRef } from "react";
import Flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";



interface ParametrizationFormProps {
    setNightShiftStart: (value: string) => void;
    setNightShiftEnd: (value: string) => void;
    setPostClosingDayOfMonth: (value: number) => void;
    getPostClosingDayOfMonth: number;
}

export default function ParametrizationForm({
    setNightShiftStart,
    setNightShiftEnd,
    setPostClosingDayOfMonth,
    getPostClosingDayOfMonth
}: ParametrizationFormProps) {

    const startDateTimePicker = useRef<HTMLInputElement>(null);
    const endDateTimePicker = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (startDateTimePicker.current) {
            Flatpickr(startDateTimePicker.current, {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true
            });
            setNightShiftStart(startDateTimePicker.current.value)
        };
        if (endDateTimePicker.current) {
            Flatpickr(endDateTimePicker.current, {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true
            });
            setNightShiftEnd(endDateTimePicker.current.value)
          };
    });

        
        function handlePostClosingDayOfMonthChange(event: React.ChangeEvent<HTMLInputElement>) {
            const inputValue = event.target.value;
            const intValue = parseInt(inputValue, 10);
            if (!isNaN(intValue)) {
                setPostClosingDayOfMonth(intValue);
            }
        }

        return (
            <form >
                <div>

                    <input
                        ref={startDateTimePicker}
                        type="text"
                        placeholder="Início do Período Noturno"
                        className="time_picker"

                    />
                    <input
                        ref={endDateTimePicker}
                        type="text"
                        placeholder="Fim do Período Noturno"
                        className="time_picker"

                    />
                </div>
                <input
                    type="text"
                    placeholder="Dia de Fechamento"
                    value={getPostClosingDayOfMonth}
                    onChange={handlePostClosingDayOfMonthChange}
                />
            </form>
        );
    }
