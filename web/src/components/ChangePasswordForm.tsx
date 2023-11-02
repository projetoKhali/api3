import React from 'react';


import {useState } from 'react';

import { UserSchema } from '../schemas/User';

import { updatePassword } from '../services/UserService';

interface ChangePasswordFormProps {
    userLoggedIn: UserSchema
    successCallback: () => void;
    errorCallback: () => void;
}

export default function ChangePasswordForm ({ userLoggedIn, successCallback, errorCallback }: ChangePasswordFormProps) {
    const [postOldPassword, setPostOldPassword] = useState<string>('');
    const [postNewPassword1, setPostNewPassword1] = useState<string>('');
    const [postNewPassword2, setPostNewPassword2] = useState<string>('');
    
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    
    function handleOldPasswordChange(event: React.ChangeEvent<HTMLInputElement>){ setPostOldPassword(event.target.value); }
    function handleNewPassword1Change(event: React.ChangeEvent<HTMLInputElement>){ setPostNewPassword1(event.target.value); }
    function handleNewPassword2Change(event: React.ChangeEvent<HTMLInputElement>){ setPostNewPassword2(event.target.value); }

  //   async function displayMessage(message: string): Promise<any> {
  //     const displayElement = document.createElement("div"); 
  //     displayElement.textContent = message; 
  //     document.body.appendChild(displayElement); 
  // }
  
  
    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!postOldPassword
        || !postNewPassword1
        || !postNewPassword2
        || postOldPassword != userLoggedIn.password 
        || postNewPassword1 != postNewPassword2) {
          setShowSuccessMessage(false);
          setShowErrorMessage(true);
          errorCallback();
        }

      else {

        updatePassword(
          userLoggedIn.id,
          postNewPassword2
        ).then(() => {
          setShowSuccessMessage(true);
          setShowErrorMessage(false);
          successCallback();
          setTimeout(() => {
            setPostOldPassword('');
            setPostNewPassword1('');
            setPostNewPassword2('');
          }, 1000); // Aguarde 1 segundo antes de limpar os campos
        })
       
                
      }
    }

    return (
      <div>
        {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Senha alterada com sucesso!
        </div>
        )}
        {showErrorMessage && (
        <div className="alert alert-success" role="alert">
          Falha na alteração de senha.
        </div>
        )}
        <form onSubmit={handleSubmit}>

            <input type="password" placeholder="Senha atual" onChange={handleOldPasswordChange}/>
            <input type="password" placeholder="Nova senha" onChange={handleNewPassword1Change}/>
            <input type="password" placeholder="Repita a nova Senha" onChange={handleNewPassword2Change}/>
            <button type="submit">Atualizar Senha</button>
        </form>

      </div>
    );
}

