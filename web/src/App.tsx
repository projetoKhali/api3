import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AppointmentsAdm from "./pages/AdmAppointments";
import Client from './pages/Client';
import Home from "./pages/Home";
import Layout from './pages/Layout';
import AppointmentsManager from "./pages/ManagerAppointments";
import ResultCenters from './pages/ResultCenters';
import Appointments from "./pages/UserAppointments";
import Users from "./pages/Users";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="appointments/user" element={<Appointments/>} />
                    <Route path="appointments/manager" element={<AppointmentsManager/>} />
                    <Route path="appointments" element={<AppointmentsAdm/>} />
                    <Route path="users" element={<Users/>} />
                    <Route path="client" element={<Client />} />
                    <Route path="resultCenters" element={<ResultCenters/>} />
                </Route>
            </Routes>
        </BrowserRouter>
   )
}

export default App
