import { Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import UserForm from '../components/UserForm';
import { UserSchema } from '../schemas/User';
import { getUsers } from '../services/UserService';
import '../styles/userTData.css';

const Users = () => {
    const [users, setUsers] = useState<UserSchema[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserSchema[]>([]);

    const requestUsers = () => {
        getUsers()
            .then(usersResponse => {
                setUsers(usersResponse);
                setFilteredUsers(usersResponse);
            });
    }

    useEffect(() => {
        requestUsers();
    }, []);

    const handleFilterChange = (filterType: string, filterValue: any) => {
        if (!filterValue) {
            setFilteredUsers(users);
            return;
        }

        const newFilteredUsers = users.filter((user) => {
            switch (filterType) {
                case "search":
                    return user.name.toLowerCase().includes(filterValue.toLowerCase());
                case "userType":
                    return user.userType === filterValue;
                case "active":
                    return user.expiredDate !== "N/A" === filterValue;
                default:
                    return true;
            }
        });

        setFilteredUsers(newFilteredUsers);
    };

    const columns: ColumnsType<UserSchema> = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            filterIcon: (filtered: boolean) => (
                <Filter
                    type="search"
                    onFilterChange={(searchText) => handleFilterChange("search", searchText)}
                />
            ),
            filterDropdown: ({ setSelectedKeys }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Filtrar por nome`}
                        onChange={(e) => setSelectedKeys([e.target.value])}
                    />
                </div>
            ),
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
            filters: [
                { text: 'Employee', value: 'Employee' },
                { text: 'Manager', value: 'Manager' },
                { text: 'Admin', value: 'Admin' },
            ],
            onFilter: (value, record) => record.userType === value,
            filterMultiple: false,
        },
        {
            title: 'Status',
            dataIndex: 'expiredDate',
            key: 'expiredDate',
        },
        {
            title: 'Ação',
            dataIndex: 'active',
            key: 'active',
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
