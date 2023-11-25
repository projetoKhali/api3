import React from "react";

import { useState } from 'react';
import { PostProjectSchema } from '../schemas/Project';
import { postProject } from '../services/ProjectService';
import PopUpMensagem from "./PopUpMessage";


export default function UserForm({ callback }: { callback: () => void }){
    const [postProjectName,setPostProjectName] = useState<string>('');
    const [postProjectDescription,setPostProjecDescription] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  
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
      .then((response) => {
      if (response.status > 300) {
        setMessage(`Não foi possível cadastrar o centro de resultado: ${response.status}`);
      } else {
        setMessage('centro de resultado cadastrado com sucesso');
      }
      setIsPopUpVisible(true);
      callback();
    })
    .catch(() => {
        setMessage('Erro ao cadastrar novo centro de resultado');
        setIsPopUpVisible(true);
        callback();
    });

    setTimeout(() => {
      setIsPopUpVisible(false);
    }, 5000);

  }

    return (
      <form onSubmit={handleSubmit}>
        {isPopUpVisible && <PopUpMensagem text={message} />}
          <input type="text" placeholder="Nome" onChange={handleNomeChange}/>
          <input type="text" placeholder="Descrição" onChange={handleDescricaoChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    )
}
