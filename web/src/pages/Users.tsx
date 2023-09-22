import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { PostUserData, getUsers, postUser } from '../services/UserService';
import UserData from '../shared/UserData';
import '../styles/userTData.css';

function UserForm({ callback }: { callback: () => void }){
    const [postUserName,setPostUserName] = useState<string>('');
    const [postUserMatricula,setPostUserMatricula] = useState<string>('');
    const [postUserEmail,setPostUserEmail] = useState<string>('');
    const [postUserFuncao,setPostUserFuncao] = useState<string>('');

    function handleNomeChange(event: any){
      setPostUserName(event.target.value)
    }

    function handleMatriculaChange(event: any){
      setPostUserMatricula(event.target.value)
    }

    function handleEmailChange(event: any){
      setPostUserEmail(event.target.value)
    }

    function handleFuncaoChange(event: any){
      setPostUserFuncao(event.target.value)
    }

    function handleSubmit(event: any) {
      event.preventDefault();
      postUser({
        name: postUserName,
        registration: postUserMatricula,
        email: postUserEmail,
        userType: postUserFuncao
      } as PostUserData)
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
    const [data, setData] = useState<UserData[]>([]);
    const requestUsers = () => {
        getUsers().then(usersResponse =>
            setData(usersResponse)
        );
    }
    useEffect(() => {
        requestUsers()
        console.log('users retornados do request:', data);
    }, []);
 
    const columns: ColumnsType<UserData> = [
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
