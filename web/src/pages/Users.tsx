import { Checkbox, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import { UserSchema } from '../schemas/User';
import { getUsers, putUser } from '../services/UserService';
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

    const handleDeactivateUser = (user: UserSchema) => {
        const confirmResult = window.confirm('Tem certeza de que deseja desativar este usuário?');
        if (confirmResult) {
            const updatedUserData = {
                id: user.id,
                name: user.name,
                registration: user.registration,
                userType: user.userType,
                email: user.email,
                password: user.password,
                active: "false",
                insertDate: user.insertDate,
                expireDate: new Date().toISOString()
            };
            putUser(user.id, updatedUserData)
                .then((updatedUser) => {
                    if (updatedUser) {
                        requestUsers();
                    }
                })
                .catch((error) => {
                    console.error('Erro ao desativar o usuário:', error);
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
            dataIndex: 'tags',
            key: 'tags',
            render: (_, data) => (
                data.active ? (
                    <button onClick={() => handleDeactivateUser(data)}>Desativar</button>
                ) : null
            ),
        },
    ];

    // Filtra os usuários com base no estado showDeactivated
    const filteredUsers = showDeactivated ? users.filter((user) => user.active === "Desativado") : users.filter((user) => user.active === "Ativo");

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
