import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import PieChart from '../components/PieChart';
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

    return (
        <div>
            <Filter type="search-nome" onFilterChange={(value) => handleFilterChange("search-nome", value)} />
            {/* Adicione outros filtros conforme necessário */}
            <PieChart data={filtered} />
        </div>
    );
}