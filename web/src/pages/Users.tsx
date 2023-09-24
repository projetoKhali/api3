import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getUsers } from '../services/UserService';
import User from '../models/User';
import '../styles/userTData.css';
import UserForm from '../components/UserForm';

export default function Users(){
    const [data, setData] = useState<User[]>([]);
    const requestUsers = () => {
        getUsers()
        .then(usersResponse => {
            setData(usersResponse);
            console.log('users retornados do request:', usersResponse);
        });
    }
    useEffect(() => {
        requestUsers()
    }, []);

    const columns: ColumnsType<User> = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Matrícula',
          dataIndex: 'registration',
          key: 'registration',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Função',
          dataIndex: 'userType',
          key: 'userType',
        },
        {
          dataIndex: 'tags',
          key: 'tags',
          render: (_,data) => (data? <button>Ver</button> : null)
        },
    ];
    return (
        <div>
            <UserForm callback={requestUsers}/>
            {data ? (
                <Table dataSource={data} columns={columns} />
            ) : (
                null
            )}
        </div>
    );
}
