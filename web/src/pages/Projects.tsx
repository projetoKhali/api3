import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import { ProjectSchema } from '../schemas/Project';
import { getProject } from '../services/ProjectService';

export default function Users() {
    const [projects, setProject] = useState<ProjectSchema[]>([]);
    const requestProjects = () => {
        getProject()
        .then(projectsResponse => {
            setProject(projectsResponse);
            console.log('users retornados do request:', projectsResponse);
        });
    }
    useEffect(() => {
        requestProjects()
    }, []);

    const columns: ColumnsType<ProjectSchema> = [
        {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        },
        {
        title: 'Descrição',
        dataIndex: 'description',
        key: 'description',
        },
        {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        },
        {
        title: 'Data de criação',
        dataIndex: 'insertDate',
        key: 'insertDate',
        },
        {
        title: 'Data de conclusão',
        dataIndex: 'expireDate',
        key: 'expireDate',
        }
    ];
    
    return (
        <div>
            <ProjectForm callback={requestProjects}/>
            {projects ? (
                <Table dataSource={projects} columns={columns} />
            ) : (
                null
            )}
        </div>
    );
}
