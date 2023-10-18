import { useEffect, useState } from 'react';
import DropdownOption from '../schemas/DropdownOption';

interface DropdownProps {
    placeholder?: string,
    options: DropdownOption[],
    onSelect: (option: DropdownOption) => void;
}

export default function Dropdown ({ placeholder, options, onSelect }: DropdownProps) {
    const [active, setActive] = useState<boolean>(false);
    const [selected, setSelected] = useState<DropdownOption | undefined>();

    useEffect(() => {
        if ((!placeholder || !placeholder.length) && options && options.length > 0) {
            setSelected(options[0]);
            onSelect(options[0]);
        }
    }, []);

    function handleSelect(option: DropdownOption) {
        setSelected(option);
        onSelect(option);
        setActive(false);
    }

    return (
        <div className="dropdown-container">
            <div
                onClick={() => {setActive(!active)}}
                className="dropdown-field"
            >
                {placeholder && placeholder.length ? (
                    <p className="dropdown-field-placeholder">
                        {placeholder}
                    </p>
                ) : (
                    <div className="dropdown-field-option">
                        {options && options.length ? (
                            <p className="dropdown-field-option-text">
                                {selected?.displayName}
                            </p>
                        ) : (
                            null
                        )}
                    </div>
                )}
            </div>
            {active && (
                <div className="dropdown-options-list">
                    {options.map((option) => (
                        <div
                            key={option.optionName}
                            className="dropdown-option"
                            onClick={() => {handleSelect(option)}}
                        >{option.displayName}</div>
                    ))}
                </div>
            )}
        </div>
    );
}
