import { Button, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
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
    const [filtered, setFiltered] = useState<AppointmentSchema[]>([]);


    const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({
        "search-nome": "",
        "search-email": "",
        "number": "",
        "userType": "",
        "active": "all",
        "date-range": "",
    });

    const requestAppointments = () => {
        getAppointmentsManager(userLoggedIn.id)
            .then(appointmentsResponse => {
                setAppointments(appointmentsResponse);
                applyFilters(filterValues, appointmentsResponse);
            });
    }

    useEffect(() => {
        requestAppointments();
    }, []);


    const handleFilterChange = (filterType: string, filterValue: any) => {
        const newFilterValues = { ...filterValues, [filterType]: filterValue };

        setFilterValues(newFilterValues);

        applyFilters(newFilterValues, appointments);
    };

    const applyFilters = (filters: { [key: string]: any }, data: AppointmentSchema[]) => {
        const newFiltered = data.filter((appointment) => {
            return Object.keys(filters).every((filterType) => {
                const filterValue = filters[filterType];
                if (!filterValue) return true;
                switch (filterType) {
                    case "date-range":
                        const appointmentStartDate = new Date(appointment.startDate);
                        const filterStartDate = new Date(filterValue.startDate);
                        const filterEndDate = new Date(filterValue.endDate);
                        return appointmentStartDate >= filterStartDate && appointmentStartDate <= filterEndDate;
                    case "type":
                        return appointment.type === filterValue;
                    case "status":
                        return appointment.status === filterValue;
                    default:
                        return true;
                }
            });
        });
    
        setFiltered(newFiltered);
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
            filterDropdown: () => (
                <Filter
                    type="selection"
                    options={[
                        { label: 'Todos', value: '' },
                        { label: 'Hora Extra', value: 'Overtime' },
                        { label: 'Sobreaviso', value: 'OnNotice' },
                    ]}
                    onFilterChange={(value) => handleFilterChange("type", value)}
                />
            ),
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
        console.log(data);
        console.log(isValidation);
    };

    const handleFeedbackConfirm = (feedback: string) => {
        console.log(selectedAppointment);
        if (selectedAppointment) {
            if (feedbackRequired && feedback.trim() === '') {
                message.error('Você deve fornecer um feedback antes de rejeitar o apontamento.');
                return;
            }
            const status = feedbackRequired ? 2 : 1;
            putAppointment(selectedAppointment, status, feedback).then((updatedUser) => {
                if (updatedUser) {
                    console.log(updatedUser);
                    requestAppointments();
                    setIsFeedbackPopupVisible(false);
                    setSelectedAppointment(null);
                }
            })
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
            {filtered ? <Table dataSource={filtered} columns={columns} /> : null}
        </div>
    );
}
