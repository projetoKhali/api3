import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import UserForm from '../components/UserForm';
import { UserSchema } from '../schemas/User';
import { getUsers, updateUserActiveStatus } from '../services/UserService';
import '../styles/userTData.css';

const Users = () => {
    const [users, setUsers] = useState<UserSchema[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserSchema[]>([]);

    // Estado para rastrear os valores dos filtros
    const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({
        "search-nome": "",
        "search-email": "",
        "number": "",
        "userType": "",
        "active": "all", // Padrão para "Todos"
    });

    const requestUsers = () => {
        getUsers()
            .then(usersResponse => {
                setUsers(usersResponse);
                applyFilters(filterValues, usersResponse); // Aplicar filtros quando os dados são buscados
            });
    }

    useEffect(() => {
        requestUsers();
    }, []);

   const handleFilterChange = (filterType: string, filterValue: any) => {
        const newFilterValues = { ...filterValues, [filterType]: filterValue };

        setFilterValues(newFilterValues);

        // Aplicar filtros com base nos novos valores dos filtros
        applyFilters(newFilterValues, users);
    };

    const applyFilters = (filters: { [key: string]: any }, data: UserSchema[]) => {
        const newFilteredUsers = data.filter((user) => {
            return Object.keys(filters).every((filterType) => {
                const filterValue = filters[filterType];
                if (!filterValue) return true; // Se o filtro estiver vazio, não aplicar filtro
                switch (filterType) {
                    case "search-nome":
                        return user.name.toLowerCase().includes(filterValue.toLowerCase());
                    case "search-email":
                        return user.email.toLowerCase().includes(filterValue.toLowerCase());
                    case "userType":
                        return user.userType === filterValue;
                    case "number":
                        return user.registration.toLowerCase().includes(filterValue.toLowerCase());
                    case "active":
                        if (filterValue === "all") return true;
                        if (filterValue === "active") return user.expiredDate === "N/A";
                        if (filterValue === "inactive") return user.expiredDate !== "N/A";
                        return true;
                    default:
                        return true;
                }
            });
        });

        setFilteredUsers(newFilteredUsers);
    };
    
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
            title: "Nome",
            dataIndex: "name",
            key: "name",
            filterDropdown: () => (
                <div>
                    <Filter
                        type="search-nome"
                        onFilterChange={(searchTextNome) => handleFilterChange("search-nome", searchTextNome)}
                    />
                </div>
            ),
        },
        {
            title: 'Matrícula',
            dataIndex: 'registration',
            key: 'registration',
            filterDropdown: ({ setSelectedKeys }) => (
                <div>
                    <Filter
                        type="number"
                        onFilterChange={(searchTextMatricula) => handleFilterChange("number", searchTextMatricula)}
                    />
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filterDropdown: ({ setSelectedKeys }) => (
                <div>
                    <Filter
                        type="search-email"
                        onFilterChange={(searchTextNome) => handleFilterChange("search-email", searchTextNome)}
                    />
                </div>
            ),
        },
        {
            title: 'Função',
            dataIndex: 'userType',
            key: 'userType',
            filterDropdown: ({ setSelectedKeys }) => (
                <Filter
                    type="selection"
                    options={[
                        { label: 'Todas', value: '' },
                        { label: 'Employee', value: 'Employee' },
                        { label: 'Manager', value: 'Manager' },
                        { label: 'Admin', value: 'Admin' },
                    ]}
                    onFilterChange={(value) => handleFilterChange("userType", value)}
                />
            ),
        },
        {
            title: 'Ativo',
            dataIndex: 'expiredDate',
            key: 'expiredDate',
            render: (expiredDate, data) => (
                expiredDate !== "N/A" ? (
                    <button onClick={() => handleChangeUserActiveStatus(data, true)}>Ativar</button>
                ) : (
                    <button onClick={() => handleChangeUserActiveStatus(data, false)}>Desativar</button>
                )
            ),
            filterDropdown: ({ setSelectedKeys }) => (
                <div>
                    <Filter
                        type="active"
                        options={[
                            { label: 'Todos', value: 'all' },
                            { label: 'Ativos', value: 'N/A' },
                            { label: 'Desativados', value: 'Ativo' },
                        ]}
                        onFilterChange={(value) => handleFilterChange("active", value)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <UserForm callback={requestUsers} />
            <Table
                dataSource={filteredUsers}
                columns={columns}
                rowKey="id"
            />
        </div>
    );
}

export default Users;
