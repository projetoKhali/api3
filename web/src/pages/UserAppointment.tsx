
import { Table } from 'antd'; // Importe o componente Table
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
  
export default function UserAppointment(){
    const [data, setData] = useState([]);
    const apiUrl = 'http://localhost:8080';
    useEffect(() =>{axios.get(apiUrl)
    .then(response => {
      // Imprima a resposta JSON no console
      //const getData = response.data;

        const newdata = response.data.map((item: any) => ({
        key: item.id.toString(), // Converte o ID para string
        name: item.name,
        age: item.age,
        address: item.address,
        tags: <button>Ver</button> // Você pode personalizar isso conforme necessário
      }));
      setData(newdata)
      console.log(data);
    })
    .catch(error => {
      // Em caso de erro, imprima o erro no console
      console.error('Erro:', error);
    })},[]);
    
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: React.ReactNode;
      }


    //   const data: DataType[] = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //       tags: <button>Ver</button>,
    //    }
    // ]
    
    const columns: ColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
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
            <h1>User Appointment</h1>
            <Table dataSource={data} columns={columns} />
        </div>
    );
    

}