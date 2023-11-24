import React, { useState } from "react";
import { UserSchema } from "../schemas/User";
import { requestLogin } from '../services/UserService';
import Popup, { PopupSchema } from '../components/PopUp';
import '../styles/login.css';

interface LoginProps {
    onLogin: (user: UserSchema) => void;
}

export default function Login ({ onLogin }: LoginProps) {
    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    const [popupData, setPopupData] = useState<PopupSchema | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>){ setLoginUsername(event.target.value); }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){ setLoginPassword(event.target.value); }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        requestLogin(
            loginUsername,
            loginPassword
        ).then(user => {
            if (!user) {
                setPopupData({
                    text: `Email e/ou senha inválidos.`,
                    buttons: [{ text: 'Fechar', onClick: handleClose }],
                    isOpen: true,
                });
                setShowPopup(true);
                throw new Error("Usuário não encontrado")};
            onLogin(user);
        })
        .catch(error => {
            console.error("Erro de autenticação:", error);
        });
        
    }
    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" onChange={handleUsernameChange} autoFocus/>
                <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
                <button type="submit">Login</button>
            </form>
            {showPopup && popupData && <Popup {...popupData} />}
        </div>
    );
}
