import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Appointments from "./pages/Appointments";
import Clients from './pages/Clients';
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
                    <Route path="clients" element={<Clients />} />
                    <Route path="resultCenters" element={<ResultCenters/>} />
                </Route>
            </Routes>
        </BrowserRouter>
   )
}

export default App
