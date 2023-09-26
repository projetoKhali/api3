import React from "react";

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import { AppointmentSchema } from '../schemas/Appointment';
import { getAppointmentsUser } from '../services/AppointmentService';

export default function Appointments () {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);

    const requestAppointments = () => {
        getAppointmentsUser(2).then(appointmentsResponse =>
            setAppointments(appointmentsResponse)
        );
    };

    useEffect(() => {
        requestAppointments()
    }, []);

    const columns: ColumnsType<AppointmentSchema> = [
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
            <AppointmentForm
                successCallback={requestAppointments}
                errorCallback={() => {}}
            />
            {appointments? (
                <Table dataSource={appointments} columns={columns} />
            ) : (
                null
            )}

        </div>
    );
}
