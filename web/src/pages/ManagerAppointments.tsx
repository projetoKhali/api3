import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { AppointmentSchema } from '../schemas/Appointment';
import { getAppointmentsManager } from '../services/AppointmentService';
import { UserSchema } from '../schemas/User';

interface AppointmentsProps {
  userLoggedIn: UserSchema;
}

export default function Appointments ({ userLoggedIn }: AppointmentsProps) {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);

    const requestAppointments = () => {
        getAppointmentsManager(userLoggedIn.id).then(appointmentsResponse =>
            setAppointments(appointmentsResponse)
        );
    };

    useEffect(() => {
        requestAppointments()
    }, []);

    const columns: ColumnsType<AppointmentSchema> = [
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
