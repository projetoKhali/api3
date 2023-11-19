import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import { AppointmentSchema } from '../schemas/Appointment';
import { getAppointmentsAdm } from '../services/AppointmentService';


export default function Appointments() {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);
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
        getAppointmentsAdm()
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
                        console.log('Texto', appointmentStartDate, filterStartDate, filterEndDate)
                        console.log('Texto', appointmentStartDate >= filterStartDate && appointmentStartDate <= filterEndDate)
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
            title: 'Solicitante',
            dataIndex: 'user',
            key: 'user',
            filterDropdown: () => (
                <div>
                    <Filter
                        type="search-nome"
                        onFilterChange={(value) => handleFilterChange("search-nome", value)}
                    />
                </div>
            ),
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
            filterDropdown: () => (
                <Filter
                    type="date-range"
                    onFilterChange={(value) => handleFilterChange("date-range", value)}
                />
            ),
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
    ]

    return (
        <div>
            <Table dataSource={filtered} columns={columns} />
        </div>
    );
}
