import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { PostResultCenterData, getResultCenters, postResultCenter } from '../services/ResultCenter';
import '../shared/ResultCenterData';
import ResultCenterData from '../shared/ResultCenterData';
import '../styles/userTData.css';

function UserForm({ callback }){
    const [postResultCenterName,setPostResultCenterName] = useState<string>('');
    const [postResultCenterCode,setPostResultCenterCode] = useState<string>('');
    const [postResultCenterAcronym,setPostResultCenterAcronym] = useState<string>('');
    const [postResultCenterInsertDate,setPostUserFuncaoInsertDate] = useState<string>('');

    function handleNomeChange(event: any){
      setPostResultCenterName(event.target.value)
    }

    function handleCodeChange(event: any){
      setPostResultCenterCode(event.target.value)
    }

    function handleAcronymChange(event: any){
      setPostResultCenterAcronym(event.target.value)
    }

    function handleInsertDateChange(event: any){
      setPostUserFuncaoInsertDate(event.target.value)
    }

    function handleSubmit(event: any) {
      event.preventDefault();
      postResultCenter({
        name: postResultCenterName,
        code: postResultCenterCode,
        acronym: postResultCenterAcronym,
        insertData: postResultCenterInsertDate
      } as PostResultCenterData)
      .then(() => callback());
    }

    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" onChange={handleNomeChange}/>
          <input type="text" placeholder="Código" onChange={handleCodeChange}/>
          <input type="text" placeholder="Sigla" onChange={handleAcronymChange}/>
          <input type="text" placeholder="Data de cadastro" onChange={handleInsertDateChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    )
}

export default function Users(){
    const [data, setData] = useState<ResultCenterData[]>([]);
    const requestResultCenters = () => {
        getResultCenters().then(ResultCenterResponse =>
            setData(ResultCenterResponse)
        );
    }
    useEffect(() => {
        requestResultCenters()
        console.log('Result Center retornados do request:', data);
    }, []);
 
    const columns: ColumnsType<ResultCenterData> = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Código',
          dataIndex: 'Código',
          key: 'Código',
        },
        {
          title: 'Sigla',
          dataIndex: 'Sigla',
          key: 'Sigla',
        },
        {
          title: 'E-mail',
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
