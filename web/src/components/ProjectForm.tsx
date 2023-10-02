import React from "react";

import { useState } from 'react';
import { ProjectSchema } from '../schemas/Project';
import { postProject } from '../services/ProjectService';


export default function UserForm({ callback }: { callback: () => void }){
    const [postProjectName,setPostProjectName] = useState<string>('');

    function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>){
        setPostProjectName(event.target.value)
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      postProject({
        name: postProjectName
      } as ProjectSchema)
      .then(() => callback());
    }

    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" onChange={handleNomeChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    )
}
