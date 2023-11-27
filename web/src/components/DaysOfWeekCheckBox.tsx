import { ColumnType } from "antd/es/table";
import { useState } from "react";

export interface EditableCheckBoxCellProps<T> {
    item: T;
    getValue: (item: T) => boolean;
    
}

export interface CheckBoxCellProps<T> {
    title: string;
    getValue: (item: T) => boolean;
    
}


export default function CheckBox<T> ({item, getValue}: EditableCheckBoxCellProps<T>) {
    
    const [checkBoxValue, setCheckBoxValue] = useState<boolean>(getValue(item));

    return (
        <>
            <p>
                <input
                    type="checkbox"
                    checked={checkBoxValue}
                    className="editable-table-cell-checkbox"
                />
            </p>
        
        </>
    );
}

export function ColumnCheckBox<T>({title, getValue}: CheckBoxCellProps<T>): ColumnType<T> {
    return {
        title,
        key: title,
        render: (_: string, record: T) => (
            <CheckBox
                item={record}
                getValue={getValue}
            />
        ),
    };
}
