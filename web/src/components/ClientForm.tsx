import { useState } from 'react';
import { postClient } from '../services/ClientService';
import { Client } from '../schemas/Client';

export default function ClientForm({ callback }: { callback: () => void }){
    const [postClientName,setPostClientName] = useState<string>('');
    const [postClientCnpj,setPostClientCnpj] = useState<string>('');

    function handleNomeChange(event: any){
      setPostClientName(event.target.value)
    }

    function handleCnpjChange(event: any){
      setPostClientCnpj(event.target.value)
    }

    function handleSubmit(event: any) {
      event.preventDefault();
      postClient({
        name: postClientName,
        cnpj: postClientCnpj,
      } as Client)
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
