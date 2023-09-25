import { useState } from "react"
import LookUpOption from "../schemas/LookUpOption";

interface LookUpProps {
    placeholder: string,
    options: LookUpOption[],
    onSelect: (option: LookUpOption) => void;
}

export default function LookUpTextField ({placeholder, options, onSelect}: LookUpProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<LookUpOption[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        setSuggestions(options.filter(option => e.target.value && option.name.includes(e.target.value)));
    }

    const handleSelect = (option: LookUpOption) => {
        onSelect(option);
        setSuggestions([]);
        setInputValue(option.name);
    }

    return (
        <div className="lookuptextfield-container">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            {suggestions.length > 0 && (
                <div className="lookuptextfield-suggestions-list">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.id}
                            className="lookuptextfield-suggestion"
                            onClick={() => {handleSelect(suggestion)}}
                        >{suggestion.name}</div>
                    ))}
                </div>
            )}
        </div>
    )
}
