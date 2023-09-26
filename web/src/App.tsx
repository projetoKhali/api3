import React from 'react';

import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Clients from './pages/Clients';
import Home from "./pages/Home";
import Layout from './pages/Layout';
import AppointmentsManager from "./pages/ManagerAppointments";
import AppointmentsAdm from "./pages/AdmAppointments";
import Appointments from "./pages/UserAppointments";
import ResultCenters from './pages/ResultCenters';
import Users from "./pages/Users";
import Login from './pages/Login';

import { UserSchema } from './schemas/User';


function App() {
    const [userLoggedIn, setUserLoggedIn] = useState<UserSchema | undefined>();

    return (
        <>
            {userLoggedIn ? (
                <Login onLogin={(user: UserSchema | undefined) => setUserLoggedIn(user)} />
            ) : (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Home />} />
                            <Route path="appointments/user" element={<Appointments/>} />
                            <Route path="appointments/manager" element={<AppointmentsManager/>} />
                            <Route path="appointments" element={<AppointmentsAdm/>} />
                            <Route path="users" element={<Users/>} />
                            <Route path="clients" element={<Clients />} />
                            <Route path="resultCenters" element={<ResultCenters/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            )}
        </>
    )
}

export default App
