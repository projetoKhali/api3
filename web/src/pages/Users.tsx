import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getUsers } from '../services/UserService';
import { UserSchema } from '../schemas/User';
import '../styles/userTData.css';
import UserForm from '../components/UserForm';
import { ButtonTableColumn } from '../components/ButtonTableCell';

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
        ButtonTableColumn({
            title: "Detalhes",
            displayName: "Ver",
            onClick: (item) => {console.log(item.name)}
        }),
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
