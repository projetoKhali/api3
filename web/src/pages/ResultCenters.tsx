import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getResultCenters } from '../services/ResultCenterService';
import ResultCenterSchema from '../schemas/ResultCenter';
import ResultCenterForm from '../components/ResultCenterForm';
import '../styles/userTData.css';

export default function ResultCenters(){
    const [resultCenters, setResultCenters] = useState<ResultCenterSchema[]>([]);
    const requestResultCenters = () => {
        getResultCenters().then(ResultCenterResponse =>
            setResultCenters(ResultCenterResponse)
        );
    }
    useEffect(() => {
        requestResultCenters()
    }, []);

    const columns: ColumnsType<ResultCenterSchema> = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Código',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'Sigla',
          dataIndex: 'acronym',
          key: 'acronym',
        },
        {
          title: 'Gestor',
          dataIndex: 'gestor',
          key: 'gestor',
        },
        {
          dataIndex: 'tags',
          key: 'tags',
          render: (_,resultCenters) => (resultCenters? <button>Ver</button> : null)
        },
    ];
    return (
        <div>
            <ResultCenterForm callback={requestResultCenters}/>
            {resultCenters ? (
                <Table dataSource={resultCenters} columns={columns} />
            ) : (
                null
            )}
        </div>
    );
}
