import React, { useState } from "react";
import { PostUserSchema } from '../schemas/User';
import { postUser } from '../services/UserService';
import PopUpMensagem from "./PopUpMessage";

export default function UserForm({ callback }: { callback: () => void }) {
  const [postUserName, setPostUserName] = useState<string>('');
  const [postUserMatricula, setPostUserMatricula] = useState<string>('');
  const [postUserEmail, setPostUserEmail] = useState<string>('');
  const [postUserFuncao, setPostUserFuncao] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPostUserName(event.target.value);
  }

  function handleMatriculaChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPostUserMatricula(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPostUserEmail(event.target.value);
  }

  function handleFuncaoChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPostUserFuncao(event.target.value);
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    postUser({
      name: postUserName,
      registration: postUserMatricula,
      email: postUserEmail,
      userType: postUserFuncao,
      password: postUserMatricula
    } as PostUserSchema)
    .then((response) => {
      if (response.status > 300) {
        setMessage(`Não foi possível cadastrar o usuário: ${response.status}`);
      } else {
        setMessage('Usuário cadastrado com sucesso');
      }
      setIsPopUpVisible(true);
      callback();
    })
    .catch(() => {
        setMessage('Erro ao cadastrar Novo Usuario');
        setIsPopUpVisible(true);
        callback();
    });

    // Redefina o estado isPopUpVisible para mostrar o PopUp novamente
    setTimeout(() => {
      setIsPopUpVisible(false);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      {isPopUpVisible && <PopUpMensagem text={message} />}
      <input type="text" placeholder="Nome" onChange={handleNomeChange} />
      <input type="text" placeholder="Matrícula" onChange={handleMatriculaChange} />
      <input type="text" placeholder="E-mail" onChange={handleEmailChange} />
      <input type="text" placeholder="Função" onChange={handleFuncaoChange} />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
