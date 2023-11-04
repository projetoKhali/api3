import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { SliceSchema } from '../schemas/Slice';
import { UserSchema } from '../schemas/User';
import { getReport } from '../services/Report';
import { getSlices } from '../services/SliceService';

interface SlicesProps {
    userLoggedIn: UserSchema;
}

export default function Slices({ userLoggedIn }: SlicesProps) {
    const [slices, setSlices] = useState<SliceSchema[]>([]);
    const camposBoolean = [true, false, true, false, true, true, false, true, false, true, true];

    const [availableColumns, setAvailableColumns] = useState([
        { name: 'appointment.id', title: 'Apontamento', visible: true },
        { name: 'appointment.user.id', title: 'Id do Usuário', visible: true },
        { name: 'appointment.type', title: 'Tipo', visible: true },
        { name: 'appointment.startDate', title: 'Data de Início', visible: true },
        { name: 'appointment.endDate', title: 'Data de Término', visible: true },
        {
            name: 'appointment.resultCenter.id',
            title: 'Id do Centro de Resultados',
            visible: true,
        },
        { name: 'appointment.client.id', title: 'Id do Cliente', visible: true },
        { name: 'appointment.project.id', title: 'Id do Projeto', visible: true },
        { name: 'status', title: 'Status', visible: true },
        { name: 'payRateRule', title: 'Verba', visible: true },
        { name: 'start', title: 'Início', visible: true },
    ]);

    const [visibleColumns, setVisibleColumns] = useState(availableColumns);

    const requestSlices = () => {
        getSlices().then((slicesResponse) => {
            setSlices(slicesResponse);
        });
    };

    useEffect(() => {
        requestSlices();
    }, []);

    const handleColumnVisibilityChange = (columnName: string) => {
        const updatedColumns = availableColumns.filter(
            (column) => column.name !== columnName
        );
        setVisibleColumns(updatedColumns);
    };

    // Mapeie os dados para incluir 'appointment.id' diretamente
    const mappedSlices = slices.map((slice) => {
        return {
            ...slice,
            'appointment.id': slice.appointment && slice.appointment.id ? slice.appointment.id : 'N/A',
            'appointment.user.id': slice.appointment.user.id ? slice.appointment.user.id : 'N/A',
            'appointment.type': slice.appointment.type ? slice.appointment.type : 'N/A',
            'appointment.startDate': slice.appointment.startDate ? slice.appointment.startDate : 'N/A',
            'appointment.endDate': slice.appointment.endDate ? slice.appointment.endDate : 'N/A',
            'appointment.resultCenter.id': slice.appointment.resultCenter.id
                ? slice.appointment.resultCenter.id
                : 'N/A',
            'appointment.client.id': slice.appointment.client.id
                ? slice.appointment.client.id
                : 'N/A',
            'appointment.project.id': slice.appointment.project.id
                ? slice.appointment.project.id
                : 'N/A',
            'status': slice.appointment.status ? slice.appointment.status : 'N/A',
        };
    });


    const handleExportToCSV = () => {
        getReport(camposBoolean, userLoggedIn.id)
            .then(() => {
                console.log('CSV exportado com sucesso');
            })
            .catch((error) => {
                console.error('Erro na exportação para CSV:', error);
            });
    };



    const columns = visibleColumns.map((column) => {
        return {
            title: column.title,
            dataIndex: column.name,
            key: column.name,
        };
    });

    return (
        <div>
            <div>
                {/* Botão para exportar para CSV */}
                <Button type="primary" onClick={handleExportToCSV}>
                    Exportar relatório CSV
                </Button>
            </div>
            <div>
                {availableColumns.map((column) => (
                    <label key={column.name}>
                        <input
                            type="checkbox"
                            checked={column.visible}
                            onChange={() => handleColumnVisibilityChange(column.name)}
                        />
                        {column.title}
                    </label>
                ))}
            </div>
            <Table dataSource={mappedSlices} columns={columns} />
        </div>
    );
}