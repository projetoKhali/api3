// Filter.js
import { useEffect, useState } from 'react';
import LookUpOption from '../schemas/LookUpOption';
import { getClients } from '../services/ClientService';
import LookUpTextField from './LookUpTextField';

interface FilterProps {
    type: "search-nome" | "search-email" | "number" | "selection" | "date-range" | "active" | "availableClients" | "availableResultCenters" | "availableProjects" ;
    options?: any[];
    onFilterChange: (value: any) => void;
}

export default function Filter({ type, options, onFilterChange }: FilterProps) {
    const [filterValue, setFilterValue] = useState('');
    const [filterValueData, setFilterValueData] = useState({
        startDate: '',
        endDate: '',
    });

    const [availableClients, setAvailableClients] = useState<LookUpOption[]>([]);
    const [availableResultCenters] = useState<LookUpOption[]>([]);
    const [availableProjects] = useState<LookUpOption[]>([]);


    const handleFilterChange = (value: any) => {
        setFilterValue(value);
        onFilterChange(value);
    };

    useEffect(() => {

        getClients().then(clientsResponse => setAvailableClients(clientsResponse.map(client => ({ id: client.id, name: client.name, }))));
      }, [])

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
                onSelect={(option: LookUpOption) =>  handleFilterChange(option)}
            />
            )}
            {type === "availableProjects" && (
                <LookUpTextField
                placeholder="Projeto"
                options={availableProjects}
                onSelect={(option: LookUpOption) =>  handleFilterChange(option)}
            />
            )}
            {type === "date-range" ? (
            <div>
                <label>Data Inicial</label>
                <input
                    type="date"
                    value={filterValueData.startDate}
                    onChange={(e) => {
                        const newStartDate = e.target.value;
                        setFilterValueData((prevData) => ({ ...prevData, startDate: newStartDate }));
                    }}
                />

                <label>Data Final</label>
                <input
                    type="date"
                    value={filterValueData.endDate}
                    onChange={(e) => {
                        const newEndDate = e.target.value;
                        setFilterValueData((prevData) => ({ ...prevData, endDate: newEndDate }));
                    }}
                />
            </div>
        ) : null}

        </div>
    );
}
