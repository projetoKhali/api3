import { Checkbox } from "antd";
import { useState } from "react";
import DropdownOption from "../schemas/DropdownOption";
import { PostPayRateRuleSchema } from "../schemas/PayRateRule";
import { postPayRateRule } from "../services/PayRateRulesService";
import AppointmentTypeDropdown from "./AppointmentTypeDropdown";
import PopUpMensagem from "./PopUpMessage";
import ShiftDropdown from "./ShiftDropdown";

interface PopupFormProps {
    successCallback: () => void;
    errorCallback: () => void;
}

export default function PopupForm({ successCallback, errorCallback }: PopupFormProps) {
    const [postCode, setCode] = useState<number | string>('');
    const [postAppointmentType, setAppointmentType] = useState<string>('');
    const [postShift, setShift] = useState<string>('');
    // const [postWeekend, setWeekend] = useState<string>('');
    const [postDaysOfWeek, setDaysOfWeek] = useState<boolean[]>([false, false, false, false, false, false, false]);
    const [postMinHourCount, setMinHourCount] = useState<number | string>('');
    const [postHourDuration, setHourDuration] = useState<number | string>('');
    const [postPayRate, setPayRate] = useState<number | string>('');
    const [postOverlap, setOverlap] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    const daysOfWeekString: string[] = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) { setCode(event.target.value); }
    function handleAppointmentTypeChange(event: React.ChangeEvent<HTMLInputElement>) { setAppointmentType(event.target.value); }
    function handleShiftChange(event: React.ChangeEvent<HTMLInputElement>) { setShift(event.target.value); }
    // function handleWeekendChange(event: React.ChangeEvent<HTMLInputElement>){ setWeekend(event.target.value); }
    function handleMinHourCountChange(event: React.ChangeEvent<HTMLInputElement>) { setMinHourCount(event.target.value); }
    function handleHourDurationChange(event: React.ChangeEvent<HTMLInputElement>) { setHourDuration(event.target.value); }
    function handlePayRateChange(event: React.ChangeEvent<HTMLInputElement>) { setPayRate(event.target.value); }
    function handleOverlapChange(event: React.ChangeEvent<HTMLInputElement>) { setOverlap(event.target.checked); }

    const handleCheckboxChange = (index: number) => {
        const novosDiasSelecionados = [...postDaysOfWeek];
        novosDiasSelecionados[index] = !novosDiasSelecionados[index];
        setDaysOfWeek(novosDiasSelecionados);
    };

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        if (!postCode || !postAppointmentType || !postShift || !postMinHourCount
            || !postHourDuration || !postPayRate || !postOverlap) {
            console.log("Hello, world!");
            setMessage('Preencha todos os campos obrigatórios.');
            setIsPopUpVisible(true);
            errorCallback();
        }

        console.log("Hello, world!2");
        event.preventDefault();

        postPayRateRule({
            code: postCode,
            appointmentType: postAppointmentType,
            // shift refere-se a se é diurno ou noturno
            shift: postShift,
            daysOfWeek: postDaysOfWeek,
            minHourCount: postMinHourCount,
            hourDuration: postHourDuration,
            payRate: postPayRate,
            overlap: postOverlap,
        } as PostPayRateRuleSchema)
            .then((response) => {
                if (response.status >= 300) {
                    setMessage(`Erro ao cadastrar: ${response.status}`);
                    errorCallback();
                } else {
                    setMessage('Apontamento lançado com sucesso.');
                    successCallback();
                }
                setIsPopUpVisible(true);
            })
            .catch(() => {
                setMessage('Erro ao lançar o apontamento.');
                errorCallback();
                setIsPopUpVisible(true);
            });

        setTimeout(() => {
            setIsPopUpVisible(false);
        }, 5000);
    }

    return (
        <form onSubmit={handleSubmit}>
            {isPopUpVisible && (
                <PopUpMensagem text={message} />
            )}
            <input type="text" placeholder="Codigo" onChange={handleCodeChange} />
            <AppointmentTypeDropdown
                onSelect={(option: DropdownOption) => {
                    setAppointmentType(option.optionName)
                }}
            />
            <ShiftDropdown
                onSelect={(option: DropdownOption) => {
                    setShift(option.optionName)
                }}
            />
            {/* <input type="text" placeholder="Fim de Semana" onChange={handleWeekendChange}/> */}
            <input type="text" placeholder="Mínimo de horas" onChange={handleMinHourCountChange} />
            <input type="text" placeholder="Duração da hora" onChange={handleHourDurationChange} />
            <input type="text" placeholder="Porcentagem" onChange={handlePayRateChange} />
            <p>
                <Checkbox

                    checked={postOverlap}
                    onChange={() => setOverlap(!postOverlap)} />
                Aceitar Sobreposição

            </p>
            <p>
                {postDaysOfWeek.map((isSelected, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <label>{`${daysOfWeekString[index]}`}</label>
                    </div>
                ))}
                {/* <p>Array de Dias Selecionados: {JSON.stringify(postDaysOfWeek)}</p> */}
            </p>


            <button type="submit">Salvar</button>

        </form>
    );

}

