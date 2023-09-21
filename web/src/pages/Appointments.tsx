import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { PostAppointmentData, getAppointments, postAppointment } from '../services/AppointmentService';
import AppointmentData from '../shared/AppointmentData';
import '../styles/AppointmentTData.css';

function AppointmentForm({ callback }: { callback: () => void }){
    const [postAppointmentType,setPostAppointmentType] = useState<string>('');
    const [postAppointmentStartDate,setPostAppointmentStartDate] = useState<string>('');
    const [postAppointmentEndDate,setPostAppointmentEndDate] = useState<string>('');
    const [postAppointmentResultCenter,setPostAppointmentResultCenter] = useState<string>('');

    function handleTypeChange(event: any){
        setPostAppointmentType(event.target.value)
    }

    function handleStartDateChange(event: any){
        setPostAppointmentStartDate(event.target.value)
    }

    function handleEndDateChange(event: any){
        setPostAppointmentEndDate(event.target.value)
    }

    function handleResultCenterChange(event: any){
        setPostAppointmentResultCenter(event.target.value)
    }

    function handleSubmit(event: any) {
    event.preventDefault();
    postAppointment({
        type: postAppointmentType,
        startDate: postAppointmentStartDate,
        endDate: postAppointmentEndDate,
        resultCenter: postAppointmentResultCenter
    } as PostAppointmentData)
    .then(() => callback());
    }

    return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tipo" onChange={handleTypeChange}/>
        <input type="text" placeholder="Data inicio" onChange={handleStartDateChange}/>
        <input type="text" placeholder="Data fim" onChange={handleEndDateChange}/>
        <input type="text" placeholder="Centro de resultado" onChange={handleResultCenterChange}/>
        <button type="submit">Cadastrar</button>
    </form>
    )
}

export default function Users(){
    const [data, setData] = useState<AppointmentData[]>([]);
    const requestAppointments = () => {
        getAppointments().then(ApponitmentResponse =>
            setData(ApponitmentResponse)
        );
    }
    useEffect(() => {
        requestAppointments()
        console.log('users retornados do request:', data);
    }, []);

    const columns: ColumnsType<AppointmentData> = [
        {
        title: 'Tipo',
        dataIndex: 'type',
        key: 'name',
        },
        {
        title: 'Data inicio',
        dataIndex: 'startDate',
        key: 'startDate',
        },
        {
        title: 'Data fim',
        dataIndex: 'endDate',
        key: 'endDate',
        },
        {
        title: 'Centro de resultado',
        dataIndex: 'resultCenter',
        key: 'resultCenter',
        },
        {
        title: 'Centro de resultado',
        dataIndex: 'tags',
        key: 'tags',
        render: (_,data) => (data? <button>Ver</button> : null)
        },
    ];
    return (
        <div>
            <AppointmentForm callback={requestAppointments}/>
            {data ? (
                <Table dataSource={data} columns={columns} />
            ) : (
                null
            )}
        </div>
    );
    

}
