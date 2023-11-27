import { ColumnType } from "antd/es/table";
import { useState } from "react";

export interface EditableCheckBoxCellProps<T> {
    item: T;
    getValue: (item: T) => boolean;
    setValue: (item: T, value: boolean) => void;
}

export interface EditableTableColumnProps_CheckBox<T> {
    title: string;
    getValue: (item: T) => boolean;
    setValue: (item: T, value: boolean) => void;
}


export default function EditableCheckBox<T> ({item, getValue, setValue}: EditableCheckBoxCellProps<T>) {
    // const [editing, setEditing] = useState<boolean>(false);
    const [checkBoxValue, setCheckBoxValue] = useState<boolean>(getValue(item));

    // const handleStartEditing = () => {
    //     setCheckBoxValue(getValue(item));
    //     setEditing(true);
    // }

    const handleEdit = () => {
        setCheckBoxValue(!checkBoxValue);
        const updatedValue = checkBoxValue;
        console.log('Novo valor do checkbox:', updatedValue);
        setValue(item, updatedValue);
        console.log('Função setValue chamada com sucesso.');
    }

    // const handleStopEditing = () => {
    //     setValue(item, checkBoxValue);
    //     setEditing(false);
    // }

    return (
        <>
        
            <p>
                <input
                    type="checkbox"
                    onChange={handleEdit}
                    checked={checkBoxValue}
                    className="editable-table-cell-checkbox"
                />
            </p>
        
        </>
    );
}

export function EditableTableColumnCheckBox<T>({title, getValue, setValue}: EditableTableColumnProps_CheckBox<T>): ColumnType<T> {
    return {
        title,
        key: title,
        render: (_: string, record: T) => (
            <EditableCheckBox
                item={record}
                setValue={setValue}
                getValue={getValue}
            />
        ),
    };
}
