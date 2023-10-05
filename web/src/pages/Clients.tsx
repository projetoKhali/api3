import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ClientForm from '../components/ClientForm';
import { useState, useEffect } from 'react';
import { getClients } from '../services/ClientService';
import { ClientSchema } from '../schemas/Client';


export default function Clients () {
    const [clients, setClients] = useState<ClientSchema[]>([]);

    const requestClients = () => {
        getClients().then(clientResponse =>
            setClients(clientResponse)
        );
    }
    useEffect(() => {
        requestClients()
    }, []);

    const columns: ColumnsType<ClientSchema> = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'CNPJ',
          dataIndex: 'cnpj',
          key: 'cnpj',
        },
        {
          dataIndex: 'tags',
          key: 'tags',
          render: (_,data) => (data? <button>Ver</button> : null)
        },
    ];
    return (
        <div>
            <ClientForm callback={requestClients}/>
            {clients ? (
                <Table dataSource={clients} columns={columns} />
            ) : (
                null
            )}
        </div>
    );
}
