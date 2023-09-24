import { useState } from "react"

interface LookUpOption {
    id: number,
    name: string,
}

export default function LookUpTextField (
    placeholder: string,
    options: LookUpOption[],
    onSelect: ((option: LookUpOption | undefined) => void),
) {
    const [suggestions, setSuggestions] = useState<LookUpOption[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuggestions(options.filter(option => option.name.includes(e.target.value)));
    }

    return (
        <div className="lookuptextfield-container">
            <input
                type="text"
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            {suggestions.length > 0 && (
                <div className="lookuptextfield-suggestions-list">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.id}
                            className="lookuptextfield-suggestion"
                            onClick={() => {onSelect(suggestion)}}
                        >{suggestion.name}</div>
                    ))}
                </div>
            )}
        </div>
    )
}
