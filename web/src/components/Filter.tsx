import { useState } from "react";

interface FilterProps {
    type: "search" | "selection" | "date-range";
    options?: any[];
    onFilterChange: (value: any) => void;
}

export default function Filter ({ type, options, onFilterChange }: FilterProps) {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (value: any) => {
        setFilterValue(value);
        onFilterChange(value);
    };

    return (
        <div>
            {type === "search" && (
                <input
                    type="text"
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
        </div>
    );
};

