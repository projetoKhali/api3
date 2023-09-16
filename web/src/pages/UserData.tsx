import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/userTData.css';
  
export default function UserData(){
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
    
    interface DataType {
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

    
    const columns: ColumnsType<DataType> = [
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
            
            <Table dataSource={data} columns={columns} />
        </div>
    );
    

}