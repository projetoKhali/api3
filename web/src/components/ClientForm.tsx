import { useState } from 'react';
import { postClient } from '../services/ClientService';
import { ClientSchema } from '../schemas/Client';

export default function ClientForm({ callback }: { callback: () => void }){
    const [postClientName,setPostClientName] = useState<string>('');
    const [postClientCnpj,setPostClientCnpj] = useState<string>('');

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
      .then(() => callback());
    }

    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" onChange={handleNomeChange}/>
          <input type="text" placeholder="CNPJ" onChange={handleCnpjChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    )
}
