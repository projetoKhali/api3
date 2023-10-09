import { useState } from "react";
import { PayRateRuleSchema } from "../schemas/PayRateRule";
import { ParametrizationSchema } from "../schemas/Parametrization";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export default function Parametrization() {
    const [payRateRules, setPayRateRules] = useState<PayRateRuleSchema[]>([]);
    
    const requestPayRateRules = () => {
        
    }

    const columns: ColumnsType<PayRateRuleSchema> = [
        {
            title: 'Verba',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Período',
            dataIndex: 'shift',
            key: 'shift',
        },
        {
            title: 'Fim de semana',
            dataIndex: 'weekend',
            key: 'weekend',
        },
        {
            title: 'Mínimo de horas',
            dataIndex: 'minHourCount',
            key: 'minHourCount',
        },
        {
            title: 'Duração da Hora',
            dataIndex: 'hourDuration',
            key: 'hourDuration',
        },
        {
            title: 'Porcentagem',
            dataIndex: 'percentage',
            key: 'percentage',
        },
        {
            title: 'Cumulativo',
            dataIndex: 'overlap',
            key: 'overlap',
        },
    ]

    return (
        <div>
            <Table dataSource={payRateRules} columns={columns} />
        </div>
    );
    
}