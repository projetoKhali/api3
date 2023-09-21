import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Client from './pages/Client';
import Home from "./pages/Home";
import Layout from './pages/Layout';
import ResultCenter from './pages/ResultCenter';
import Users from "./pages/Users";
import Appointments from "./pages/Appointments";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="appointments" element={<Appointments/>} />
                    <Route path="users" element={<Users/>} />
                    <Route path="client" element={<Client />} />
                    <Route path="ResultCenter" element={<ResultCenter/>} />
                </Route>
            </Routes>
        </BrowserRouter>
   )
}

export default App
