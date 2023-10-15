import { Checkbox, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import { UserSchema } from '../schemas/User';
import { getUsers, updateUserActiveStatus } from '../services/UserService';
import '../styles/userTData.css';

export default function Users() {
    const [users, setUsers] = useState<UserSchema[]>([]);
    const [showDeactivated, setShowDeactivated] = useState(false);

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

    const handleChangeUserActiveStatus = (data: UserSchema, newActiveStatus: boolean) => {
        const operation = newActiveStatus ? 'ativar' : 'desativar';
        const confirmResult = window.confirm(`Tem certeza de que deseja ${operation} este usuário?`);
        if (confirmResult) {
            updateUserActiveStatus(data, newActiveStatus)
                .then((updatedUser) => {
                    if (updatedUser) {
                        requestUsers();
                    }
                })
                .catch((error) => {
                    console.error('Erro ao ativar o usuário:', error);
                });
        }
    };

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
            title: 'Ação',
            dataIndex: 'expiredDate',
            key: 'expiredDate',
            render: (expiredDate, data) => (
                expiredDate !== "N/A" ? (
                    <button onClick={() => handleChangeUserActiveStatus(data, true)}>Ativar</button>
                ) : (
                    <button onClick={() => handleChangeUserActiveStatus(data, false)}>Desativar</button>
                )
            ),
        },
    ];

    const filteredUsers = users.filter((user) => showDeactivated == (user.expiredDate !== "N/A"));

return (
        <div>
            <UserForm callback={requestUsers} />
            <Checkbox
                checked={showDeactivated}
                onChange={(e) => setShowDeactivated(e.target.checked)}
            >
                Mostrar Usuários Desativados
            </Checkbox>
            <Table dataSource={filteredUsers} columns={columns} />
        </div>
    );
}
