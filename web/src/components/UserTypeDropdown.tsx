import DropdownOption from "../schemas/DropdownOption";
import Dropdown from './Dropdown';


interface UserTypeDropdownProps {
    onSelect: (option: DropdownOption) => void;
}

export default function UserTypeDropdown ({onSelect}: UserTypeDropdownProps) {
    const options = [
        {
            displayName: 'Colaborador',
            optionName: 'Employee',
        },
        {
            displayName: 'Gerente',
            optionName: 'Manager',
        },
        {
            displayName: 'Administrador',
            optionName: 'Admin',
        }
    ] as DropdownOption[];

    function handleSelect(option: DropdownOption) {

        onSelect(option);
    }

    return (
        <Dropdown options={options} onSelect={handleSelect}/>
    );
}
