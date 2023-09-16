import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PostUserData, postUser } from '../services/UserService';
import '../styles/userTData.css';


interface UserData {
  key: string;
  name: string;
  registration: string;
  userType: string;
  email: string;
  tags: React.ReactNode;
  password: string;
  active: Boolean;
  insertDate: Date;
  expireDate: Date;
}

function UserForm(){
    const [postUserName,setPostUserName] = useState<String>('');
    const [postUserMatricula,setPostUserMatricula] = useState<String>('');
    const [postUserEmail,setPostUserEmail] = useState<String>('');
    const [postUserFuncao,setPostUserFuncao] = useState<String>('');


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
      } as PostUserData);

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
    const [data, setData] = useState([]);
    const apiUrl = 'http://localhost:8080/users';
    useEffect(() =>{axios.get(apiUrl)
    .then(response => {
        const newdata = response.data.map((item: any) => ({
        key: item.id.toString(), 
        name: item.name? item.name : "N/A",
        registration: item.registration? item.registration : "N/A",
        userType: item.userType? item.userType : "N/A",
        email: item.email? item.email : "N/A",
        password: item.password? item.password : "N/A",
        active: item.active? item.active : "N/A",
        insertDate: item.insertDate? item.insertDate : "N/A",
        expireDate: item.expireDate? item.expireDate : "N/A",
        tags: <button>Ver</button> 
        
      }));
      setData(newdata)
      console.log(data);
    })
    .catch(error => {
      console.error('Erro:', error);
    })},[]);
    
 
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
          render: (_,{tags}) => (data?
                <>
                   {tags}
                </>
           : <> </>
           )
         

        },
    ];
    return (
        <div>
            <UserForm/>
            <Table dataSource={data} columns={columns} />
        </div>
    );
    

}