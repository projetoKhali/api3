import { useState } from 'react';
import { PostUserSchema } from '../schemas/User';
import { postUser } from '../services/UserService';


export default function UserForm({ callback }: { callback: () => void }){
    const [postUserName,setPostUserName] = useState<string>('');
    const [postUserMatricula,setPostUserMatricula] = useState<string>('');
    const [postUserEmail,setPostUserEmail] = useState<string>('');
    const [postUserFuncao,setPostUserFuncao] = useState<string>('');

    function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostUserName(event.target.value)
    }

    function handleMatriculaChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostUserMatricula(event.target.value)
    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostUserEmail(event.target.value)
    }

    function handleFuncaoChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostUserFuncao(event.target.value)
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      postUser({
        name: postUserName,
        registration: postUserMatricula,
        email: postUserEmail,
        userType: postUserFuncao
      } as PostUserSchema)
      .then(() => callback());
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
