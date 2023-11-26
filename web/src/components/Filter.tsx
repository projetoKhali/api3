// Filter.js
import "flatpickr/dist/themes/airbnb.css";
import { useEffect, useState } from 'react';
import LookUpOption from '../schemas/LookUpOption';
import { UserSchema } from '../schemas/User';
import { getClients } from '../services/ClientService';
import { getProjects } from '../services/ProjectService';
import { getResultCentersOfUser } from '../services/ResultCenterService';
import "../styles/filters.css";
import LookUpTextField from './LookUpTextField';


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


    const handleFilterChange = (value: any) => {
        setFilterValue(value);
        onFilterChange(value);
    };

    useEffect(() => {
        getClients().then(clientsResponse => setAvailableClients(clientsResponse.map(client => ({ id: client.id, name: client.name }))));
        getProjects().then(projectsResponse => setAvailableProjects(projectsResponse.map(project => ({ id: project.id, name: project.name }))));

        if (userLoggedIn) {
            getResultCentersOfUser(userLoggedIn).then(resultCentersResponse => setAvailableResultCenters(resultCentersResponse.map(resultCenter => ({ id: resultCenter.id, name: resultCenter.name }))));
        }
    }, [userLoggedIn]);

    return (
        <div >
            {type === "search-nome" && (
                <input
                    className="search-nome"
                    type="text"
                    placeholder="Filtrar..."
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            )}
            {type === "search-email" && (
                <input
                    className="search-email"
                    type="text"
                    placeholder="Filtrar..."
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            )}
            {type === "number" && (
                <input
                className="number"
                    type="number"
                    placeholder="Filtrar..."
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            )}
            {type === "selection" && options && options.length > 0 && (
                <select
                className="selection"
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
                className="active"
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
                    type="date"
                    placeholder="Início"
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            ) : null}
            {type === "date-end" ? (
                <input
                    type="date"
                    placeholder="Fim"
                    value={filterValue}
                    onChange={(e) => handleFilterChange(e.target.value)}
                />
            ) : null}
        </div>
    );
}
