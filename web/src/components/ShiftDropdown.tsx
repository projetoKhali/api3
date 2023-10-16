import DropdownOption from "../schemas/DropdownOption";
import Dropdown from './Dropdown';


interface ShiftDropdownProps {
    onSelect: (option: DropdownOption) => void;
}

export default function ShiftDropdown ({onSelect}: ShiftDropdownProps) {
    const options = [
        {
            displayName: 'Noturno',
            optionName: 'Nightime',
        },
        {
            displayName: 'Diurno',
            optionName: 'Daytime',
        },
        {
            displayName: 'Todo o dia',
            optionName: 'Allday',
        }
    ] as DropdownOption[];

    function handleSelect(option: DropdownOption) {

        onSelect(option);
    }

    return (
        <Dropdown options={options} onSelect={handleSelect}/>
    );
}
