import React from 'react';


import {useState } from 'react';

import { UserSchema } from '../schemas/User';

import { updatePassword } from '../services/UserService';
import { Button, Form } from 'antd';

interface ChangePasswordFormProps {
    userLoggedIn: UserSchema
    successCallback: () => void;
    errorCallback: () => void;
}

export default function ChangePasswordForm ({ userLoggedIn, successCallback, errorCallback }: ChangePasswordFormProps) {
    const [postOldPassword, setPostOldPassword] = useState<string>('');
    const [postNewPassword1, setPostNewPassword1] = useState<string>('');
    const [postNewPassword2, setPostNewPassword2] = useState<string>('');

    const oldPassword = document.querySelector(".oldPassword") as HTMLInputElement;
    const newPassword1 = document.querySelector(".newPassword1") as HTMLInputElement;
    const newPassword2 = document.querySelector(".newPassword2") as HTMLInputElement;
    
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    
    function handleOldPasswordChange(event: React.ChangeEvent<HTMLInputElement>){ setPostOldPassword(event.target.value); }
    function handleNewPassword1Change(event: React.ChangeEvent<HTMLInputElement>){ setPostNewPassword1(event.target.value); }
    function handleNewPassword2Change(event: React.ChangeEvent<HTMLInputElement>){ setPostNewPassword2(event.target.value); }

     
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
          oldPassword.value = "";
          newPassword1.value = "";
          newPassword2.value = "";
        }

      else {

        updatePassword(
          userLoggedIn.id,
          postNewPassword2
        ).then(() => {
          setShowSuccessMessage(true);
          setShowErrorMessage(false);
          successCallback();
          oldPassword.value = "";
          newPassword1.value = "";
          newPassword2.value = "";
          
        }
        )
      
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
        
        <form onSubmit={handleSubmit} >

            <input type="password" placeholder="Senha atual" className= "oldPassword" onChange={handleOldPasswordChange}/>
            <input type="password" placeholder="Nova senha" className = "newPassword1" onChange={handleNewPassword1Change}/>
            <input type="password" placeholder="Repita a nova Senha" className = "newPassword2" onChange={handleNewPassword2Change}/>
            <button type="submit">Atualizar Senha</button>
        </form>
      </div>
    );
}

