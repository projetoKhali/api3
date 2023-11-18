import Flatpickr from "flatpickr";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import "flatpickr/dist/themes/airbnb.css";
import { useEffect, useRef, useState } from 'react';
import AppointmentTypeDropdown from '../components/AppointmentTypeDropdown';
import Filter from '../components/Filter';
import PieChart from '../components/PieChart';
import { AppointmentSchema } from '../schemas/Appointment';
import DropdownOption from '../schemas/DropdownOption';
import LookUpOption from '../schemas/LookUpOption';
import { getAppointmentsAdm } from '../services/AppointmentService';
import { getClients } from '../services/ClientService';
import { getProjects } from '../services/ProjectService';
import { getResultCenters } from '../services/ResultCenterService';

export default function Appointments() {
    const [appointments, setAppointments] = useState<AppointmentSchema[]>([]);
    const [filtered, setFiltered] = useState<AppointmentSchema[]>([]);
    const [filterAppointmentStartDate, setPostAppointmentStartDate] = useState<string>('');
    const [filterAppointmentEndDate, setPostAppointmentEndDate] = useState<string>('');
    const [filterAppointmentType, setPostAppointmentType] = useState<string>('');

    const [filterAppointmentClient, setPostAppointmentClient] = useState<LookUpOption | undefined>();
    const [availableClients, setAvailableClients] = useState<LookUpOption[]>([]);

    const [filterAppointmentResultCenter, setPostAppointmentResultCenter] = useState<LookUpOption | undefined>();
    const [availableResultCenters, setAvailableResultCenters] = useState<LookUpOption[]>([]);

    const [filterAppointmentProject, setPostAppointmentProject] = useState<LookUpOption | undefined>();
    const [availableProjects, setAvailableProjects] = useState<LookUpOption[]>([]);

    const startDateTimePicker = useRef<HTMLInputElement>(null);
    const endDateTimePicker = useRef<HTMLInputElement>(null);

    interface FilterValues {
        "search-nome": string;
        "search-email": string;
        "number": string;
        "userType": string;
        "active": string;
        "date-range": string;
        "client": {
            name: string;
        };
    }


    const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({
        "search-nome": "",
        "search-email": "",
        "number": "",
        "userType": "",
        "active": "all",
        "date-range": "",
        "client": {
            "name" : ""
        },
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
                dateFormat: 'd/m/Y H:i',
                defaultDate: 'today',
                locale: Portuguese,
            });
        };
        if (endDateTimePicker.current) {
            Flatpickr(endDateTimePicker.current, {
                enableTime: true,
                dateFormat: 'd/m/Y H:i',
                defaultDate: 'today',
                locale: Portuguese,
            });
        };

        getClients().then(clientsResponse => setAvailableClients(clientsResponse.map(client => ({ id: client.id, name: client.name, }))));
        getResultCenters().then(resultCentersResponse => setAvailableResultCenters(resultCentersResponse.map(resultCenter => ({ id: resultCenter.id, name: resultCenter.name, }))));
        getProjects().then(projectsResponse => setAvailableProjects(projectsResponse.map(project => ({ id: project.id, name: project.name, }))));
        requestAppointments();

    }, []);

    const handleFilterChange = (filterType: string, filterValue: any) => {
       let newFilterValues;

    if (filterType.startsWith("client")) {
        newFilterValues = {
            ...filterValues,
            client: {
                ...filterValues.client,
                [filterType.split(".")[1]]: filterValue,
            },
        };
    } else {
        newFilterValues = { ...filterValues, [filterType]: filterValue };
    }
        setFilterValues(newFilterValues);
        applyFilters(newFilterValues, appointments);
        console.log(newFilterValues)
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
                    case "client.name":
                        return appointment.client.name === filterValue;
                    default:
                        return true;
                }
            });
        });

        setFiltered(newFiltered);
    };
    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValues({ ...filterValues, "date-range": { ...filterValues["date-range"], startDate: event.target.value } });
        applyFilters(filterValues, appointments);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValues({ ...filterValues, "date-range": { ...filterValues["date-range"], endDate: event.target.value } });
        applyFilters(filterValues, appointments);
    };

    return (
        <div>
            <AppointmentTypeDropdown
                onSelect={(option: DropdownOption) => {
                    setPostAppointmentType(option.optionName);
                }}
            />
            <div>
                <input
                    ref={startDateTimePicker}
                    type="text"
                    placeholder="Início"
                    className="date_time_picker"
                    onChange={handleStartDateChange}
                />
                <input
                    ref={endDateTimePicker}
                    type="text"
                    placeholder="Fim"
                    className="date_time_picker"
                    onChange={handleEndDateChange}
                />
            </div>


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
                onFilterChange={(value) => handleFilterChange("client.name", value)}
            />
            <PieChart data={filtered} />
        </div>
    );
}