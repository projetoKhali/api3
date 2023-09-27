import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AppointmentsAdm from "./pages/AdmAppointments";
import Clients from './pages/Clients';
import Home from "./pages/Home";
import Layout from './pages/Layout';
import Login from './pages/Login';
import AppointmentsManager from "./pages/ManagerAppointments";
import ResultCenters from './pages/ResultCenters';
import Appointments from "./pages/UserAppointments";
import Users from "./pages/Users";

import { UserSchema } from './schemas/User';


function App() {
    const [userLoggedIn, setUserLoggedIn] = useState<UserSchema | undefined>();

    return (
        <>
            {userLoggedIn ? (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Home />} />
                            <Route path="appointments/user" element={<Appointments userLoggedIn={userLoggedIn}/>} />
                            <Route path="appointments/manager" element={<AppointmentsManager userLoggedIn={userLoggedIn}/>} />
                            <Route path="appointments" element={<AppointmentsAdm/>} />
                            <Route path="users" element={<Users/>} />
                            <Route path="clients" element={<Clients/>} />
                            <Route path="resultCenters" element={<ResultCenters/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            ) : (
                <Login onLogin={(user: UserSchema | undefined) => setUserLoggedIn(user)} />
            )}
        </>
    )
}

export default App
