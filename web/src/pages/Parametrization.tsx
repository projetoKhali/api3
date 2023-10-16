import { useEffect, useState } from "react";
import { PayRateRuleSchema } from "../schemas/PayRateRule";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getPayRateRules, postPayRateRule } from "../services/PayRateRulesService";
import ParametrizationForm from "../components/ParametrizationForm";
import Popup, { PopupSchema } from "../components/PopUpParametrization";
import { EditableTableColumn } from "../components/EditableTableCell";
import { PostParameterSchema } from "../schemas/Parametrization";
import { postParameter } from "../services/ParametrizationService";

export default function Parametrization() {
    const [payRateRules, setPayRateRules] = useState<PayRateRuleSchema[]>([]);

    const requestPayRateRules = () => {
        getPayRateRules().then(payRateRulesResponse =>
            setPayRateRules(payRateRulesResponse)
        );
    };

    const [popupData, setPopupData] = useState<PopupSchema | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        requestPayRateRules()
    }, []);

    const handleClose = () => {
        setShowPopup(false);
    };

    const [postNightShiftStart, setNightShiftStart] = useState<string>('');
    const [postNightShiftEnd, setNightShiftEnd] = useState<string>('');
    const [postClosingDayOfMonth, setClosingDayOfMonth] = useState<number>(0);

    const columns: ColumnsType<PayRateRuleSchema> = [
        EditableTableColumn({
            title: 'Verba',
            getValue: (item: PayRateRuleSchema)=>`${item.code}`,
            setValue: (item: PayRateRuleSchema, value: string)=>item.code=parseInt(value),

        }),
        EditableTableColumn({
            title: 'Tipo',
            getValue: (item: PayRateRuleSchema)=>item.appointmentType,
            setValue: (item: PayRateRuleSchema, value: string)=>item.appointmentType=value,
        }),
        EditableTableColumn({
            title: 'Período',
            getValue: (item: PayRateRuleSchema)=>item.shift,
            setValue: (item: PayRateRuleSchema, value: string)=>item.shift=value,
        }),
        // EditableTableColumn({
        //     title: 'Fim de semana',
        //     getValue: (item: PauRateRuleSchema)=>item.weekend,
        //     setValue: (item: PayRateRuleSchema, value: string)=>item.weekend=value,
        // }),
        EditableTableColumn({
            title: 'Mínimo de horas',
            getValue: (item: PayRateRuleSchema)=>`${item.minHourCount}`,
            setValue: (item: PayRateRuleSchema, value: string)=>item.minHourCount=parseFloat(value),
        }),
        EditableTableColumn({
            title: 'Duração da hora',
            getValue: (item: PayRateRuleSchema)=>`${item.hourDuration}`,
            setValue: (item: PayRateRuleSchema, value: string)=>item.hourDuration=parseFloat(value),
        }),
        EditableTableColumn({
            title: 'Porcentagem',
            getValue: (item: PayRateRuleSchema)=>`${item.payRate}`,
            setValue: (item: PayRateRuleSchema, value: string)=>item.payRate=parseFloat(value),
        }),
        EditableTableColumn({
            title: 'Cumulativo',
            getValue: (item: PayRateRuleSchema)=>`${item.overlap}`,
            setValue: (item: PayRateRuleSchema, value: string)=>item.overlap=stringToBoolean(value),
        }),
    ]

    async function postPayRateRules(payRateRules: PayRateRuleSchema[]) {
        return await Promise.all(
        payRateRules.map(
        payRateRule => postPayRateRule(payRateRule)
        )
        );
        }

    function handleSubmit() {
        if (!postNightShiftStart || !postNightShiftEnd || !postClosingDayOfMonth) {
            console.log("Hello, world!");
            return;
        }

        const formattedNightShiftStart = formatTime (postNightShiftStart);
        const formattedNightShiftEnd = formatTime (postNightShiftEnd);

        postParameter({
            nightShiftStart: formattedNightShiftStart,
            nightShiftEnd: formattedNightShiftEnd,
            closingDayOfMonth: postClosingDayOfMonth,
        } as PostParameterSchema);

        // postPayRateRules();
    }

    return (
        <div>
            <ParametrizationForm
                setNightShiftStart={setNightShiftStart}
                setNightShiftEnd={setNightShiftEnd}
                setPostClosingDayOfMonth={setClosingDayOfMonth}
            />
            <button type="button" onClick={() => {
                handleSubmit();
            }}>
                Salvar
            </button>
            <button type="button" onClick={() => {
                setPopupData({
                    text: 'Cadastro de Verbas',
                    buttons: [{ text: 'x', onClick: handleClose }],
                    isOpen: true,
                });
                setShowPopup(true);
            }}>
                Cadastrar Verba
            </button>
            {payRateRules ? (
                <Table dataSource={payRateRules} columns={columns} />
            ) : (
                null
            )}
            {showPopup && popupData && <Popup {...popupData} />}
        </div>
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

const stringToBoolean = (value: string): boolean => {
    if (value.toLowerCase() === 'true') {
        return true;
    } else if (value.toLowerCase() === 'false') {
        return false;
    } else {
        throw new Error('Valor inválido. A string deve ser "true" ou "false".');
    }
};
