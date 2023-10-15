import { useEffect, useState } from "react";
import { PayRateRuleSchema } from "../schemas/PayRateRule";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getPayRateRules } from "../services/PayRateRulesService";
import ParametrizationForm from "../components/ParametrizationForm";
import Popup, { PopupSchema } from "../components/PopUpParametrization";
import EditableTableCell, { EditableTableColumn } from "../components/EditableTableCell";

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

    const stringToBoolean = (value: string): boolean => {
        if (value.toLowerCase() === 'true') {
          return true;
        } else if (value.toLowerCase() === 'false') {
          return false;
        } else {
          throw new Error('Valor inválido. A string deve ser "true" ou "false".');
        }
      };

    const [postNightShiftStart, setNightShiftStart] = useState<string>('');
    const [postNightShiftEnd, setNightShiftEnd] = useState<string>('');
    const [postClosingDayOfMonth, setClosingDayOfMonth] = useState<number | string>('');

    function handleNightShiftStartChange(event: React.ChangeEvent<HTMLInputElement>){ setNightShiftStart(event.target.value) }
    function handleNightShiftEndChange(event: React.ChangeEvent<HTMLInputElement>){ setNightShiftEnd(event.target.value)}
    function handlePostClosingDayOfMonthChange(event: React.ChangeEvent<HTMLInputElement>){ 
        const inputValue = event.target.value;
        const intValue = parseInt(inputValue, 10);
        if (!isNaN(intValue)) {
            setClosingDayOfMonth(intValue);
        } else {
            setClosingDayOfMonth("");
        }
        return postClosingDayOfMonth;
    }


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

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>, ) {


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
    // const [open, setOpen] = useState<boolean>(false);
    return (
        <div>
            <ParametrizationForm
                errorCallback={() => { }}
                successCallback={() => { }}
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