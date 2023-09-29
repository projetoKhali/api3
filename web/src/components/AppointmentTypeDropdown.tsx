import DropdownOption from "../schemas/DropdownOption";
import Dropdown from './Dropdown';


interface AppointmentTypeDropdownProps {
    onSelect: (option: DropdownOption) => void;
}

export default function AppointmentTypeDropdown ({onSelect}: AppointmentTypeDropdownProps) {
    const options = [
        {
            displayName: 'Hora Extra',
            optionName: 'Overtime',
        },
        {
            displayName: 'Sobreaviso',
            optionName: 'OnNotice',
        }
    ] as DropdownOption[];

    function handleSelect(option: DropdownOption) {

        onSelect(option);
    }

    return (
        <Dropdown options={options} onSelect={handleSelect}/>
    );
}
