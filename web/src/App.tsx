import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Appointments from "./pages/Appointments";
import Clients from './pages/Clients';
import Home from "./pages/Home";
import Layout from './pages/Layout';
import ResultCenter from './pages/ResultCenters';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="resultCenters" element={<ResultCenter/>} />
                    <Route path="appointments" element={<Appointments/>} />
                </Route>
            </Routes>
        </BrowserRouter>
   )
}

export default App
