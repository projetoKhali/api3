import { ReactNode } from "react";


interface SchemaListProps<T> {
    data: T[];
    template: (item: T) => ReactNode;
}

export default function SchemaList<T> ({data, template}: SchemaListProps<T>) {
    return (
        <div className="schema-list">
            <ul>
            {data.map((item, index) => (
                <li key={index}>
                    {template(item)}
                </li>
            ))}
            </ul>
        </div>
    )
}
