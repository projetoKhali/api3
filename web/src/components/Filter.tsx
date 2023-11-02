// Filter.js
import { useState } from 'react';

interface FilterProps {
    type: "search-nome" | "search-email" | "number" | "selection" | "date-range" | "active";
    options?: any[];
    onFilterChange: (value: any) => void;
}

export default function Filter({ type, options, onFilterChange }: FilterProps) {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (value: any) => {
        setFilterValue(value);
        onFilterChange(value);
    };

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
        </div>
    );
}
