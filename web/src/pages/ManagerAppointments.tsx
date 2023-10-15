import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { ButtonTableColumn } from '../components/ButtonTableCell';
import Popup, { PopupSchema } from '../components/PopUp';
import { AppointmentSchema } from '../schemas/Appointment';
import { UserSchema } from '../schemas/User';
import { getAppointmentsManager, putAppointment } from '../services/AppointmentService';

interface AppointmentsProps {
    userLoggedIn: UserSchema;
}

export default function Appointments({ userLoggedIn }: AppointmentsProps) {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);
    const [popupData, setPopupData] = useState<PopupSchema | null>(null);
    const [showPopup, setShowPopup] = useState(false);


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
        },
        ButtonTableColumn({
            title: "Detalhes",
            displayName: "Validar",
            onClick: (record) => {
                setPopupData({
                    text: `Selecione uma opção:`,
                    buttons: [
                        { text: 'Aprovar', onClick: () => handleApproved(record) },
                        { text: 'Rejeitar', onClick: () => handleRejected(record) },
                        { text: 'Fechar', onClick: handleClose },
                    ],
                    isOpen: true,
                });
                setShowPopup(true);
            }
        }),
    ];

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleApproved = (data: AppointmentSchema) => {
        putAppointment(data, 1)
            .then((updatedUser) => {
                if (updatedUser) {
                    requestAppointments();
                    setShowPopup(false);
                }
            })
    };

    const handleRejected = (data: AppointmentSchema) => {
        putAppointment(data, 2)
            .then((updatedUser) => {
                if (updatedUser) {
                    requestAppointments();
                    setShowPopup(false);
                }
            })
    };

    return (
        <div>
            {appointments ? (
                <Table dataSource={appointments} columns={columns} />
            ) : null}

            {showPopup && popupData && <Popup {...popupData} />}
        </div>
    );
}
