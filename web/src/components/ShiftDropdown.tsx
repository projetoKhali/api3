import DropdownOption from "../schemas/DropdownOption";
import Dropdown from './Dropdown';


interface ShiftDropdownProps {
    onSelect: (option: DropdownOption) => void;
}

export default function ShiftDropdown ({onSelect}: ShiftDropdownProps) {
    const options = [
        {
            displayName: 'Noturno',
            optionName: 'NightTime',
        },
        {
            displayName: 'Diurno',
            optionName: 'DayTime',
        },
        {
            displayName: 'Todo o dia',
            optionName: 'AllDay',
        }
    ] as DropdownOption[];

    function handleSelect(option: DropdownOption) {

        onSelect(option);
    }

    return (
        <Dropdown options={options} onSelect={handleSelect}/>
    );
}
