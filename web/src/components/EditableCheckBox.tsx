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
    const [editing, setEditing] = useState<boolean>(false);
    const [checkBoxValue, setCheckBoxValue] = useState<boolean>(getValue(item));

    const handleStartEditing = () => {
        setCheckBoxValue(getValue(item));
        setEditing(true);
    }

    const handleEdit = () => {
        setCheckBoxValue(!checkBoxValue);
    }

    const handleStopEditing = () => {
        setValue(item, checkBoxValue);
        setEditing(false);
    }

    return (
        <>
        {editing ? (
            <form
                className="editable-table-cell editable-table-cell-editing"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleStopEditing();
                  }}
            >
                <input
                    type="checkbox"
                    onChange={handleEdit}
                    checked={checkBoxValue}
                    className="editable-table-cell-checkbox"
                />
                <button
                    type="submit"
                    className="editable-table-cell-button"
                >
                    Ok
                </button>
            </form>
        ) : (
            <p
                className="editable-table-cell editable-table-cell-display"
                onClick={handleStartEditing}
            >
                <input
                    type="checkbox"
                    onChange={handleEdit}
                    checked={checkBoxValue}
                    className="editable-table-cell-checkbox"
                />
            </p>
        )}
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
