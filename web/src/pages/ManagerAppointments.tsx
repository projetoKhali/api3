import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Appointment } from '../schemas/Appointment';
import { getAppointmentsManager } from '../services/AppointmentService';

export default function Appointments () {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const requestAppointments = () => {
        getAppointmentsManager(1).then(appointmentsResponse =>
            setAppointments(appointmentsResponse)
        );
    };

    useEffect(() => {
        // Chama a função para buscar os compromissos quando o componente for montado
        requestAppointments();
    }, []);

    const columns: ColumnsType<Appointment> = [
        {
            title: 'Solicitante',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Tipo',
            dataIndex: 'appointmentType',
            key: 'appointmentType',
        },
        {
            title: 'Início',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Fim',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'CR',
            dataIndex: 'resultCenter',
            key: 'resultCenter',
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Projeto',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Justificativa',
            dataIndex: 'justification',
            key: 'justification',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ]

    return (
        <div>
        <Table dataSource={appointments} columns={columns} />
    </div>
    );
}
