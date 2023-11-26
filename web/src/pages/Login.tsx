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
    const loginKhaliLogo = '/khali_logo_light.png';

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
            if (!user) throw new Error();
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
        <div className="login-container">
            <img src={loginKhaliLogo} alt="Khali" />
            <form
                className="login-form"
                onSubmit={handleSubmit}
            >
                <input
                    className="login-input"
                    type="text"
                    placeholder="Email"
                    onChange={handleUsernameChange}
                    autoFocus
                />
                <input
                    className="login-input"
                    type="text"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                />
                <button className="login-button" type="submit">Login</button>
            </form>
            {showPopup && popupData && <Popup {...popupData} />}
        </div>
    );
}
