// Filter.js
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import "flatpickr/dist/themes/airbnb.css";
import { useEffect, useRef, useState } from 'react';
import LookUpOption from '../schemas/LookUpOption';
import { UserSchema } from '../schemas/User';
import { getClients } from '../services/ClientService';
import { getProjects } from '../services/ProjectService';
import { getResultCentersOfUser } from '../services/ResultCenterService';
import LookUpTextField from './LookUpTextField';

import Flatpickr from "flatpickr";


interface FilterProps {
    type: "search-nome" | "search-email" | "number" | "selection" | "date-range" | "active" | "availableClients" | "availableResultCenters" | "availableProjects" | "date-start" | "date-end";
    options?: any[];
    onFilterChange: (value: any) => void;
    userLoggedIn?: UserSchema;
}

export default function Filter({ userLoggedIn, type, options, onFilterChange }: FilterProps) {
    const [filterValue, setFilterValue] = useState('');

    const [availableClients, setAvailableClients] = useState<LookUpOption[]>([]);
    const [availableResultCenters, setAvailableResultCenters] = useState<LookUpOption[]>([]);
    const [availableProjects, setAvailableProjects] = useState<LookUpOption[]>([]);
    const startDateTimePicker = useRef<HTMLInputElement | null>(null);
    const endDateTimePicker = useRef<HTMLInputElement | null>(null);

    const handleFilterChange = (value: any) => {
        setFilterValue(value);
        onFilterChange(value);
    };

    useEffect(() => {
        if (startDateTimePicker.current) {
            Flatpickr(startDateTimePicker.current, {
                enableTime: false,
                dateFormat: 'd/m/Y',
                defaultDate: 'today',
                locale: Portuguese,
                onChange: function (selectedDates, dateStr) {
                    handleFilterChange(dateStr);
                }
            });
        }
        if (endDateTimePicker.current) {
            Flatpickr(endDateTimePicker.current, {
                enableTime: false,
                dateFormat: 'd/m/Y',
                defaultDate: 'today',
                locale: Portuguese,
                onChange: function (selectedDates, dateStr) {
                    handleFilterChange(dateStr);
                }
            });
        }

        getClients().then(clientsResponse => setAvailableClients(clientsResponse.map(client => ({ id: client.id, name: client.name }))));
        getProjects().then(projectsResponse => setAvailableProjects(projectsResponse.map(project => ({ id: project.id, name: project.name }))));

        if (userLoggedIn) {
            getResultCentersOfUser(userLoggedIn).then(resultCentersResponse => setAvailableResultCenters(resultCentersResponse.map(resultCenter => ({ id: resultCenter.id, name: resultCenter.name }))));
        }
    }, [userLoggedIn]);

    return (
        <div>
            {type === "search-nome" && (
                <input
                    type="text"
                    placeholder="Filtrar..."
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            )}
            {type === "search-email" && (
                <input
                    type="text"
                    placeholder="Filtrar..."
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            )}
            {type === "number" && (
                <input
                    type="number"
                    placeholder="Filtrar..."
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            )}
            {type === "selection" && options && options.length > 0 && (
                <select
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
            {type === "active" && (
                <select
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                >
                    <option value="all">Todos</option>
                    <option value="active">Ativos</option>
                    <option value="inactive">Desativados</option>
                </select>
            )}
            {type === "availableClients" && (
                <LookUpTextField
                    placeholder="Cliente"
                    options={availableClients}
                    onSelect={(option: LookUpOption) => handleFilterChange(option.name)}
                />
            )}
            {type === "availableResultCenters" && (
                <LookUpTextField
                    placeholder="Centro de Resultado"
                    options={availableResultCenters}
                    onSelect={(option: LookUpOption) => handleFilterChange(option.name)}
                />
            )}
            {type === "availableProjects" && (
                <LookUpTextField
                    placeholder="Projeto"
                    options={availableProjects}
                    onSelect={(option: LookUpOption) => handleFilterChange(option.name)}
                />
            )}
            {type === "date-start" ? (
                <input
                    ref={startDateTimePicker}
                    type="text"
                    placeholder="Início"
                    className="date_time_picker"
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            ) : null}
            {type === "date-end" ? (
                <input
                    ref={endDateTimePicker}
                    type="text"
                    placeholder="Fim"
                    className="date_time_picker"
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            ) : null}
        </div>
    );
}
