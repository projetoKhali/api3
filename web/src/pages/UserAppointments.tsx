import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import Popup, { PopupSchema } from '../components/PopUp';
import { AppointmentSchema } from '../schemas/Appointment';

import { UserSchema } from '../schemas/User';
import { getAppointmentsUser } from '../services/AppointmentService';

interface AppointmentsProps {
    userLoggedIn: UserSchema;
}

export default function Appointments({ userLoggedIn }: AppointmentsProps) {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);
    const [popupData, setPopupData] = useState<PopupSchema | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const requestAppointments = () => {
        getAppointmentsUser(userLoggedIn.id).then((appointmentsResponse) =>
            setAppointments(appointmentsResponse)
        );
    };

    useEffect(() => {
        requestAppointments();
    }, []);

    const columns: ColumnsType<AppointmentSchema> = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
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
            render: (status, record) => {
                if (status === 'Rejected') {
                    return (
                        <span
                            onClick={() => {
                                setPopupData({
                                    text: `Feedback do gestor: ${record.feedback}`,
                                    buttons: [{ text: 'Fechar', onClick: handleClose }],
                                    isOpen: true,
                                });
                                setShowPopup(true);
                            }}
                        >
                            {status}
                        </span>
                    );
                } else {
                    return status;
                }
            },
        },
    ];

    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <AppointmentForm
                userLoggedIn={userLoggedIn}
                successCallback={requestAppointments}
                errorCallback={() => {}}
            />
            {appointments ? (
                <Table dataSource={appointments} columns={columns} />
            ) : null}

            {showPopup && popupData && <Popup {...popupData} />}
        </div>
    );
}
