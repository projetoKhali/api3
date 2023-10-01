import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import { UserSchema } from '../schemas/User';
import { getUsers } from '../services/UserService';
import '../styles/userTData.css';

export default function Users() {
    const [users, setUsers] = useState<UserSchema[]>([]);
    const requestUsers = () => {
        getUsers()
        .then(usersResponse => {
            setUsers(usersResponse);
            console.log('users retornados do request:', usersResponse);
        });
    }
    useEffect(() => {
        requestUsers()
    }, []);

    const columns: ColumnsType<UserSchema> = [
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
          title: 'Status',
          dataIndex: 'active',
          key: 'active',
        },
        {
          dataIndex: 'tags',
          key: 'tags',
          render: (_,data) => (data? <button>Desativar</button> : null)
        },
        
    ];
    return (
        <div>
            <UserForm callback={requestUsers}/>
            {users ? (
                <Table dataSource={users} columns={columns} />
            ) : (
                null
            )}
        </div>
    );
}
