import React from "react";

import { useState } from 'react';
import { requestLogin } from '../services/UserService';
import { UserSchema } from "../schemas/User";

interface LoginProps {
    onLogin: (user: UserSchema | undefined) => void;
}

export default function Login ({ onLogin }: LoginProps) {
    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>){ setLoginUsername(event.target.value); }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){ setLoginPassword(event.target.value); }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        requestLogin(
            loginUsername,
            loginPassword
        ).then(result => onLogin(result));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={handleUsernameChange}/>
            <input type="text" placeholder="Password" onChange={handlePasswordChange}/>
            <button type="submit">Login</button>
        </form>
    );
}
