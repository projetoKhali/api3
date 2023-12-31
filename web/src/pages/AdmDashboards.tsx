import "flatpickr/dist/themes/airbnb.css";
import { useEffect, useState } from 'react';
import BarChartDays from '../components/BarChartDaysOfMonth';
import BarChartHours from '../components/BarChartHoursOfDay';
import Filter from '../components/Filter';
import PieChart from '../components/PieChart';
import { AppointmentSchema } from '../schemas/Appointment';
import { UserSchema } from "../schemas/User";
import { getAppointmentsAdm } from '../services/AppointmentService';
import "../styles/dashboard.css";
import "../styles/filters.css";

interface AppointmentsProps {
    userLoggedIn: UserSchema;
}

export default function Appointments({ userLoggedIn }: AppointmentsProps) {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);
    const [filtered, setFiltered] = useState<AppointmentSchema[]>([]);

    const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({
        "type": "",
        "status": "",
        "client": "",
        "resultCenter": "",
        "project": "",
        "startDate": "",
        "endDate": "",
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
        // Para datas, garantimos que o formato esteja correto antes de definir no estado
        const formattedDate = filterValue instanceof Date ? filterValue.toLocaleDateString() : filterValue;

        const newFilterValues = { ...filterValues, [filterType]: formattedDate };
        setFilterValues(newFilterValues);
        applyFilters(newFilterValues, appointments);
        console.log(newFilterValues);
    };

    const applyFilters = (filters: { [key: string]: any }, data: AppointmentSchema[]) => {
        const newFiltered = data.filter((appointment) => {
            return Object.keys(filters).every((filterType) => {
                const filterValue = filters[filterType];
                if (filterValue === null || filterValue === undefined || filterValue === '') {
                    return true;
                }
                switch (filterType) {
                    case "type":
                        return appointment.type === filterValue;
                    case "status":
                        return appointment.status === filterValue;
                    case "client":
                        return appointment.client === filterValue;
                    case "resultCenter":
                        return appointment.resultCenter === filterValue;
                    case "project":
                        return appointment.project === filterValue;
                    case "startDate":
                        const filterStartDate = new Date(filterValue);
                        const appointmentStartDate = new Date(appointment.startDate);
                        /* Compare the dates without considering time components */
                        return appointmentStartDate.setHours(0, 0, 0, 0) >= filterStartDate.setHours(0, 0, 0, 0);
                    case "endDate":
                        const filterEndDate = new Date(filterValue);
                        const appointmentEndDate = new Date(appointment.endDate);
                        return appointmentEndDate.setHours(0, 0, 0, 0) <= filterEndDate.setHours(0, 0, 0, 0);
                    default:
                        return true;

                }
            });
        });

        // Atualiza o array filtrado
        setFiltered(newFiltered);
        console.log(newFiltered);
    };

    return (
        <div className="dashabord-admin-page">
            <div className="filters">
                <Filter
                    type="selection"
                    options={[
                        { label: 'Todos', value: '' },
                        { label: 'Hora Extra', value: 'Overtime' },
                        { label: 'Sobreaviso', value: 'OnNotice' },
                    ]}
                    onFilterChange={(value) => handleFilterChange("type", value)}
                />
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
                <Filter
                    type="availableClients"
                    onFilterChange={(value) => handleFilterChange("client", value)}
                />
                <Filter
                    type="availableResultCenters"
                    onFilterChange={(value) => handleFilterChange("resultCenter", value)}
                    userLoggedIn={userLoggedIn}
                />
                <Filter
                    type="availableProjects"
                    onFilterChange={(value) => handleFilterChange("project", value)}
                />
                <Filter
                    type="date-start"
                    onFilterChange={(value) => handleFilterChange("startDate", value)}
                />
                <Filter
                    type="date-end"
                    onFilterChange={(value) => handleFilterChange("endDate", value)}
                />
            </div>
            <div className="charts-line1">
                <PieChart data={filtered} />
                <BarChartHours data={filtered} />
            </div>
                <div className="charts-line2">
                    <BarChartDays data={filtered} />
            </div>
            </div>
    );
}