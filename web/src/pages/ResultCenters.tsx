import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getResultCenters } from '../services/ResultCenter';
import '../schemas/ResultCenter';
import ResultCenter from '../schemas/ResultCenter';
import '../styles/userTData.css';
import UserForm from '../components/UserForm';

export default function Users(){
    const [data, setData] = useState<ResultCenter[]>([]);
    const requestResultCenters = () => {
        getResultCenters().then(ResultCenterResponse =>
            setData(ResultCenterResponse)
        );
    }
    useEffect(() => {
        requestResultCenters()
    }, []);

    const columns: ColumnsType<ResultCenter> = [
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
          render: (_,data) => (data? <button>Ver</button> : null)
        },
    ];
    return (
        <div>
            <UserForm callback={requestResultCenters}/>
            {data ? (
                <Table dataSource={data} columns={columns} />
            ) : (
                null
            )}
        </div>
    );
}
