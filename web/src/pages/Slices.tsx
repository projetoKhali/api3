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
    const [camposBoolean, setCamposBoolean] = useState([true, false, true, false, true, true, false, true, false, true, true]);

    const [availableColumns, setAvailableColumns] = useState([
        { name: 'appointment.id', title: 'Apontamento', visible: true },
        { name: 'appointment.user.name', title: 'Id do Usuário', visible: true },
        { name: 'appointment.type', title: 'Tipo', visible: true },
        { name: 'appointment.startDate', title: 'Data de Início', visible: true },
        { name: 'appointment.endDate', title: 'Data de Término', visible: true },
        {
            name: 'appointment.resultCenter.name',
            title: 'Id do Centro de Resultados',
            visible: true,
        },
        { name: 'appointment.client.name', title: 'Id do Cliente', visible: true },
        { name: 'appointment.project.name', title: 'Id do Projeto', visible: true },
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
        const updatedColumns = availableColumns.map((column) => {
            if (column.name === columnName) {
                // Inverte o estado da visibilidade da coluna
                return {
                    ...column,
                    visible: !column.visible,
                };
            }
            return column;
        });
        setVisibleColumns(updatedColumns);

        const updatedCamposBoolean = updatedColumns.map((column) => column.visible);
        setCamposBoolean(updatedCamposBoolean);
    };


    // Mapeie os dados para incluir 'appointment.id' diretamente
    const mappedSlices = slices.map((slice) => {
        return {
            ...slice,
            'appointment.id': slice.appointment && slice.appointment.id ? slice.appointment.id : 'N/A',
            'appointment.user.name': slice.appointment.user.name ? slice.appointment.user.name : 'N/A',
            'appointment.type': slice.appointment.type ? slice.appointment.type : 'N/A',
            'appointment.startDate': slice.appointment.startDate ? slice.appointment.startDate : 'N/A',
            'appointment.endDate': slice.appointment.endDate ? slice.appointment.endDate : 'N/A',
            'appointment.resultCenter.name': slice.appointment.resultCenter.name
                ? slice.appointment.resultCenter.name
                : 'N/A',
            'appointment.client.name': slice.appointment.client.name
                ? slice.appointment.client.name
                : 'N/A',
            'appointment.project.name': slice.appointment.project.name
                ? slice.appointment.project.name
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