import { useState } from 'react';
import { PostResultCenterSchema } from '../schemas/ResultCenter';
import { postResultCenter } from '../services/ResultCenterService';

export default function ResultCenterForm({ callback }: { callback: () => void }){
    const [postResultCenterName,setPostResultCenterName] = useState<string>('');
    const [postResultCenterCode,setPostResultCenterCode] = useState<string>('');
    const [postResultCenterAcronym,setPostResultCenterAcronym] = useState<string>('');
    const [postResultCenterGestor,setPostResultCenterGestor] = useState<string>('');

    function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostResultCenterName(event.target.value)
    }

    function handleCodeChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostResultCenterCode(event.target.value)
    }

    function handleAcronymChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostResultCenterAcronym(event.target.value)
    }

    function handleGestorChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostResultCenterGestor(event.target.value)
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      postResultCenter({
        name: postResultCenterName,
        code: postResultCenterCode,
        acronym: postResultCenterAcronym,
        gestor: {
          id: postResultCenterGestor
        }
      } as PostResultCenterSchema)
      .then(() => callback());
    }

    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" onChange={handleNomeChange}/>
          <input type="text" placeholder="Código" onChange={handleCodeChange}/>
          <input type="text" placeholder="Sigla" onChange={handleAcronymChange}/>
          <input type="text" placeholder="Gestor" onChange={handleGestorChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    )
}
