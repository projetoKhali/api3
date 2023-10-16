import { ColumnType } from "antd/es/table";
import { useState } from "react";

export interface EditableTableCellProps<T> {
    item: T;
    getValue: (item: T) => string;
    setValue: (item: T, value: string) => void;
}

export interface EditableTableColumnProps<T> {
    title: string;
    getValue: (item: T) => string;
    setValue: (item: T, value: string) => void;
}

export default function EditableTableCell<T> ({item, getValue, setValue}: EditableTableCellProps<T>) {
    const [editing, setEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const handleStartEditing = () => {
        setInputValue(getValue(item));
        setEditing(true);
    }

    const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleStopEditing = () => {
        setValue(item, inputValue);
        setEditing(false);
    }

    return (
        <>
        {editing ? (
            <form
                className="editable-table-cell editable-table-cell-editing"
                onSubmit={handleStopEditing}
            >
                <input
                    type="text"
                    onChange={handleEdit}
                    value={inputValue}
                    className="editable-table-cell-input"
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
                {getValue(item)}
            </p>
        )}
        </>
    );
}

export function EditableTableColumn<T>({title, getValue, setValue}: EditableTableColumnProps<T>): ColumnType<T> {
    return {
        title,
        key: title,
        render: (_: string, record: T) => (
            <EditableTableCell
                item={record}
                setValue={setValue}
                getValue={getValue}
            />
        ),
    };
}
