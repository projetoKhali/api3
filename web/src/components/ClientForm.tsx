import { useState } from 'react';
import { ClientSchema } from '../schemas/Client';
import { postClient } from '../services/ClientService';
import PopUpMensagem from './PopUpMessage';

export default function ClientForm({ callback }: { callback: () => void }){
    const [postClientName,setPostClientName] = useState<string>('');
    const [postClientCnpj,setPostClientCnpj] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    function handleNomeChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostClientName(event.target.value)
    }

    function handleCnpjChange(event: React.ChangeEvent<HTMLInputElement>){
      setPostClientCnpj(event.target.value)
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      postClient({
        name: postClientName,
        cnpj: postClientCnpj,
      } as ClientSchema)
      .then((response) => {
      if (response.status > 300) {
        setMessage(`Não foi possível cadastrar cliente: ${response.status}`);
      } else {
        setMessage('Cliente cadastrado com sucesso');
      }
      setIsPopUpVisible(true);
      callback();
    })
    .catch(() => {
        setMessage('Erro ao cadastrar Novo Usuario');
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
          <input type="text" placeholder="CNPJ" onChange={handleCnpjChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    )
}
