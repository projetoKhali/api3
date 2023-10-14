import { ColumnType } from "antd/es/table";

interface ButtonTableCellProps<T> {
    item: T,
    displayName: string,
    onClick: (item: T) => void;
}

export default function ButtonTableCell<T> ({item, displayName, onClick}: ButtonTableCellProps<T>) {
    return (
        <button onClick={() => { onClick(item) }}>
            {displayName}
        </button>
    );
}

export function RenderButtonTableCell<T>(title: string, displayName: string, onClick: (item: T) => void): ColumnType<T> {
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
