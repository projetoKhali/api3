import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePasswordForm from './components/ChangePasswordForm';
import AppointmentsAdm from "./pages/AdmAppointments";
import DashboardAdm from "./pages/AdmDashboards";
import Clients from './pages/Clients';
import Home from "./pages/Home";
import Layout from './pages/Layout';
import Login from './pages/Login';
import AppointmentsManager from "./pages/ManagerAppointments";
import DashboardManager from "./pages/ManagerDashboards";
import Parametrization from './pages/Parametrization';
import Projects from "./pages/Projects";
import ResultCenters from './pages/ResultCenters';
import Slices from './pages/Slices';
import Appointments from "./pages/UserAppointments";
import DashboardUser from "./pages/UserDashboards";
import Users from "./pages/Users";

import { UserSchema } from './schemas/User';
import { getPayRateRules } from './services/PayRateRulesService';
import { getSlices } from './services/SliceService';

import './styles/App.css';


function App() {
    const [userLoggedIn, setUserLoggedIn] = useState<UserSchema | undefined>();

    useEffect(() => {
        getSlices().then(response => console.log('----------------> getSlices:', response));
        getPayRateRules().then(response => console.log('---------------------------> PayRateRules:', response));
    });

    return (
        <>
            {userLoggedIn ? (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout userLoggedIn={userLoggedIn} />}>
                            <Route index element={<Home />} />
                            <Route path="dashboards/admin" element={<DashboardAdm userLoggedIn={userLoggedIn}/>} />
                            <Route path="dashboards/manager" element={<DashboardManager userLoggedIn={userLoggedIn} />} />
                            <Route path="dashboards/user" element={<DashboardUser userLoggedIn={userLoggedIn} />} />
                            <Route path="appointments/user" element={<Appointments userLoggedIn={userLoggedIn} />} />
                            <Route path="appointments/manager" element={<AppointmentsManager userLoggedIn={userLoggedIn} />} />
                            <Route path="appointments" element={<AppointmentsAdm />} />
                            <Route path="users" element={<Users />} />
                            <Route path="clients" element={<Clients />} />
                            <Route path="resultCenters" element={<ResultCenters />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="parametrization" element={<Parametrization />} />
                            <Route path="changePassword" element={<ChangePasswordForm userLoggedIn={userLoggedIn} successCallback={() => { }} errorCallback={() => { }} />} />
                            <Route path="slices" element={<Slices userLoggedIn={userLoggedIn} />} />
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
