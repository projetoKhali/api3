import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getUsers, postUser } from '../services/UserService';
import User from '../models/User';
import { PostUserSchema } from '../schemas/User';
import '../styles/userTData.css';

function UserForm({ callback }: { callback: () => void }){
    const [postUserName,setPostUserName] = useState<string>('');
    const [postUserMatricula,setPostUserMatricula] = useState<string>('');
    const [postUserEmail,setPostUserEmail] = useState<string>('');
    const [postUserFuncao,setPostUserFuncao] = useState<string>('');

    function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostUserName(event.target.value)
    }

    function handleMatriculaChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostUserMatricula(event.target.value)
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostUserEmail(event.target.value)
    }

    function handleFuncaoChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostUserFuncao(event.target.value)
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      postUser({
        name: postUserName,
        registration: postUserMatricula,
        email: postUserEmail,
        userType: postUserFuncao
      } as PostUserSchema)
      .then(() => callback());
    }

    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" onChange={handleNomeChange}/>
          <input type="text" placeholder="Matrícula" onChange={handleMatriculaChange}/>
          <input type="text" placeholder="E-mail" onChange={handleEmailChange}/>
          <input type="text" placeholder="Função" onChange={handleFuncaoChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    )
}

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
