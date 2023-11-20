import Flatpickr from "flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import "flatpickr/dist/themes/airbnb.css";
import { useEffect, useRef, useState } from 'react';
import Filter from '../components/Filter';
import PieChart from '../components/PieChart';
import { AppointmentSchema } from '../schemas/Appointment';
import LookUpOption from '../schemas/LookUpOption';
import { UserSchema } from "../schemas/User";
import { getAppointmentsAdm } from '../services/AppointmentService';

interface AppointmentsProps {
    userLoggedIn: UserSchema;
}

export default function Appointments({ userLoggedIn }: AppointmentsProps) {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);
    const [filtered, setFiltered] = useState<AppointmentSchema[]>([]);
    const [filterAppointmentStartDate, setPostAppointmentStartDate] = useState<string>('');
    const [filterAppointmentEndDate, setPostAppointmentEndDate] = useState<string>('');
    const [filterAppointmentType, setPostAppointmentType] = useState<string>('');
    const [setAvailableClients] = useState<LookUpOption[]>([]);
    const [setAvailableResultCenters] = useState<LookUpOption[]>([]);
    const [setAvailableProjects] = useState<LookUpOption[]>([]);

    const startDateTimePicker = useRef<HTMLInputElement>(null);
    const endDateTimePicker = useRef<HTMLInputElement>(null);


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
        if (startDateTimePicker.current) {
            Flatpickr(startDateTimePicker.current, {
                enableTime: true,
                dateFormat: 'd/m/Y',
                defaultDate: 'today',
                locale: Portuguese,
            });
        };
        if (endDateTimePicker.current) {
            Flatpickr(endDateTimePicker.current, {
                enableTime: true,
                dateFormat: 'd/m/Y',
                defaultDate: 'today',
                locale: Portuguese,
            });
        };
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
                    case "endDate":
                        const filterDate = new Date(filterValue);
                        const appointmentDate = new Date(appointment[filterType]);
                        // Ajuste para comparar apenas as datas
                        filterDate.setHours(0, 0, 0, 0);
                        appointmentDate.setHours(0, 0, 0, 0);
                        return filterDate <= appointmentDate;
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
        <div>
            {/* <input type="text" placeholder="Início" onChange={handleStartDateChange} />
      <input type="text" placeholder="Fim" onChange={handleEndDateChange} /> */}
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
            <PieChart data={filtered} />
        </div>
    );
}