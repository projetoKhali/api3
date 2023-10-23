import React from 'react';


import {useState } from 'react';

import { UserSchema } from '../schemas/User';

import { updatePassword } from '../services/UserService';

interface ChangePasswordFormProps {
    userLoggedIn: UserSchema
    successCallback: () => void
    errorCallback: () => void;
}

export default function ChangePasswordForm ({ userLoggedIn, successCallback, errorCallback }: ChangePasswordFormProps) {
    const [postOldPassword, setPostOldPassword] = useState<string>('');
    const [postNewPassword1, setPostNewPassword1] = useState<string>('');
    const [postNewPassword2, setPostNewPassword2] = useState<string>('');
    
    function handleOldPasswordChange(event: React.ChangeEvent<HTMLInputElement>){ setPostOldPassword(event.target.value); }
    function handleNewPassword1Change(event: React.ChangeEvent<HTMLInputElement>){ setPostNewPassword1(event.target.value); }
    function handleNewPassword2Change(event: React.ChangeEvent<HTMLInputElement>){ setPostNewPassword2(event.target.value); }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!postOldPassword
        || !postNewPassword1
        || !postNewPassword2
        ) {errorCallback();}

      else if (postOldPassword != userLoggedIn.password || postNewPassword1 != postNewPassword2) {errorCallback();}

      else {

        updatePassword(
          userLoggedIn.id,
          postNewPassword2
        ).then(() => successCallback())
        
      }
    }

    return (
      <form onSubmit={handleSubmit}>

          <input type="text" placeholder="Senha atual" onChange={handleOldPasswordChange}/>
          <input type="text" placeholder="Nova senha" onChange={handleNewPassword1Change}/>
          <input type="text" placeholder="Repita a nova Senha" onChange={handleNewPassword2Change}/>
          <button type="submit">Atualizar Senha</button>
      </form>
    );
}

