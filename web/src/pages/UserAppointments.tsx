import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import Popup from '../components/PopUp';
import { AppointmentSchema } from '../schemas/Appointment';
import { UserSchema } from "../schemas/User";
import { getAppointmentsUser } from '../services/AppointmentService';

interface AppointmentsProps {
    userLoggedIn: UserSchema;
}

interface AppointmentUserSchema extends AppointmentSchema {
    feedback: string;
}

// Defina uma função de utilidade para mapear os objetos AppointmentSchema para AppointmentUserSchema
const mapAppointmentSchemaToUserSchema = (appointment: AppointmentSchema): AppointmentUserSchema => {
    return {
        ...appointment,
        feedback: '', // Defina a propriedade feedback como vazia ou com um valor padrão
    };
};

export default function Appointments({ userLoggedIn }: AppointmentsProps) {
    const [appointments, setAppointments] = useState<AppointmentUserSchema[]>([]);
    const [feedbackPopup, setFeedbackPopup] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    const requestAppointments = () => {
        getAppointmentsUser(userLoggedIn.id).then((appointmentsResponse: AppointmentSchema[]) => {
            const userAppointments = appointmentsResponse.map(appointment => mapAppointmentSchemaToUserSchema(appointment));
            setAppointments(userAppointments);
        });
    };

    useEffect(() => {
        requestAppointments();
    }, []);

    const columns: ColumnsType<AppointmentUserSchema> = [
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
            dataIndex: 'resultCenter.id', // Acesse a propriedade id
            key: 'resultCenter',
        },
        {
            title: 'Cliente',
            dataIndex: 'client.id', // Acesse a propriedade id
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
                if (status === 'Reject') {
                    return (
                        <button onClick={() => showFeedbackPopup(record.feedback)}>
                            Feedback do Gestor
                        </button>
                    );
                } else if (status === 'Pending' || status === 'Approved') {
                    return "Não há feedback para esse apontamento no momento";
                } else {
                    return status;
                }
            },
        },
    ]

    const showFeedbackPopup = (feedback: string) => {
        setFeedbackPopup(true);
        setFeedbackText(feedback);
    };

    const closeFeedbackPopup = () => {
        setFeedbackPopup(false);
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
            {feedbackPopup && (
                <Popup
                    text={feedbackText}
                    buttons={[{ text: 'Fechar', onClick: closeFeedbackPopup }]}
                    onClose={closeFeedbackPopup}
                />
            )}
        </div>
    );
}
