import React from "react";

import { useState } from 'react';
import { PostProjectSchema } from '../schemas/Project';
import { postProject } from '../services/ProjectService';


export default function UserForm({ callback }: { callback: () => void }){
    const [postProjectName,setPostProjectName] = useState<string>('');
    const [postProjectDescription,setPostProjecDescription] = useState<string>('');

    function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>){
        setPostProjectName(event.target.value)
    }

    function handleDescricaoChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostProjecDescription(event.target.value)
  }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      postProject({
        name: postProjectName,
        description: postProjectDescription,
      } as PostProjectSchema )
      .then(() => callback());
    }
    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" onChange={handleNomeChange}/>
          <input type="text" placeholder="Descrição" onChange={handleDescricaoChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    )
}
