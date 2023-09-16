
import { Table } from 'antd'; // Importe o componente Table
import type { ColumnsType } from 'antd/es/table';


  
export default function UserAppointment(){
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: React.ReactNode;
      }

      const data: DataType[] = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: <button>Ver</button>,
       }
    ]
    
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