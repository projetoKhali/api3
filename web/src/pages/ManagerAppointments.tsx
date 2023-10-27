import { Button, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import FeedbackPopup from '../components/PopUpField';
import { AppointmentSchema } from '../schemas/Appointment';
import { UserSchema } from '../schemas/User';
import { getAppointmentsManager, putAppointment } from '../services/AppointmentService';

interface AppointmentsProps {
    userLoggedIn: UserSchema;
}

export default function Appointments({ userLoggedIn }: AppointmentsProps) {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);
    const [isFeedbackPopupVisible, setIsFeedbackPopupVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentSchema | null>(null);
    const [feedbackRequired, setFeedbackRequired] = useState(false);

    const requestAppointments = () => {
        getAppointmentsManager(userLoggedIn.id).then((appointmentsResponse) => {
            setAppointments(appointmentsResponse);
        });
    };

    useEffect(() => {
        requestAppointments();
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
        {
            title: 'Ação',
            key: 'action',
            render: (record) => (
                <Button.Group>
                    <Button
                        type="primary"
                        onClick={() => handleValidate(record, false)}
                    >
                        Validar
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleValidate(record, true)}
                    >
                        Recusar
                    </Button>
                </Button.Group>
            ),
        },
    ];

    const handleValidate = (data: AppointmentSchema, isValidation: boolean) => {
        setSelectedAppointment(data);
        setFeedbackRequired(isValidation);
        setIsFeedbackPopupVisible(true);
    };

    const handleFeedbackConfirm = (feedback: string) => {
        if (selectedAppointment) {
            if (feedbackRequired && feedback.trim() === '') {
                message.error('Você deve fornecer um feedback antes de rejeitar o apontamento.');
                return;
            }
    
            const status = feedbackRequired ? 1 : 2;
            putAppointment(selectedAppointment, status, feedback).then((updatedUser) => {
                if (updatedUser) {
                    requestAppointments();
                    setIsFeedbackPopupVisible(false);
                    setSelectedAppointment(null);
                }
            });
        }
    };

    const handleFeedbackCancel = () => {
        setSelectedAppointment(null);
        setIsFeedbackPopupVisible(false);
        setFeedbackRequired(false);
    };

    return (
        <div>
            {isFeedbackPopupVisible && (
                <FeedbackPopup
                    onConfirm={handleFeedbackConfirm}
                    onCancel={handleFeedbackCancel}
                />
            )}
            {appointments ? <Table dataSource={appointments} columns={columns} /> : null}
        </div>
    );
}
