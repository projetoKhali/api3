import { ColumnType } from "antd/es/table";

export interface ButtonTableCellProps<T> {
    item: T;
    displayName: string;
    onClick: (item: T) => void;
}

export interface ButtonTableColumnProps<T> {
    title: string;
    displayName: string;
    onClick: (item: T) => void;
}

export default function ButtonTableCell<T> ({item, displayName, onClick}: ButtonTableCellProps<T>) {
    return (
        <button onClick={() => { onClick(item) }}>
            {displayName}
        </button>
    );
}

export function RenderButtonTableCell<T>({title, displayName, onClick}: ButtonTableColumnProps<T>): ColumnType<T> {
  return {
    title,
    key: title,
    render: (_: string, record: T) => (
      <ButtonTableCell
        item={record}
        displayName={displayName}
        onClick={onClick}
      />
    ),
  };
}
