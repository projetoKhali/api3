import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Appointments from "./pages/Appointments";
import Client from './pages/Client';
import Home from "./pages/Home";
import Layout from './pages/Layout';
import ResultCenters from './pages/ResultCenters';
import Users from "./pages/Users";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="appointments" element={<Appointments/>} />
                    <Route path="users" element={<Users/>} />
                    <Route path="client" element={<Client />} />
                    <Route path="resultCenters" element={<ResultCenters/>} />
                </Route>
            </Routes>
        </BrowserRouter>
   )
}

export default App
