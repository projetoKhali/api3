import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import Popup, { PopupSchema } from '../components/PopUp';
import { AppointmentSchema } from '../schemas/Appointment';

import Filter from '../components/Filter';
import { UserSchema } from '../schemas/User';
import { getAppointmentsUser } from '../services/AppointmentService';

interface AppointmentsProps {
    userLoggedIn: UserSchema;
}

export default function Appointments({ userLoggedIn }: AppointmentsProps) {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);
    const [popupData, setPopupData] = useState<PopupSchema | null>(null);
    const [showPopup, setShowPopup] = useState(false);
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
        getAppointmentsUser(userLoggedIn.id)
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


    const columns: ColumnsType<AppointmentSchema> = [
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
            filterDropdown: () => (
                <Filter
                    type="selection"
                    options={[
                        { label: 'Todos', value: '' },
                        { label: 'Pendente', value: 'Pending' },
                        { label: 'Aprovados', value: 'Approved' },
                        { label: 'Recusados', value: 'Rejected' },
                    ]}
                    onFilterChange={(value) => handleFilterChange("status", value)}
                />
            ),
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
            {filtered ? (
                <Table dataSource={filtered} columns={columns} />
            ) : null}

            {showPopup && popupData && <Popup {...popupData} />}
        </div>
    );
}
