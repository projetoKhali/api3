import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Client from './pages/Client';
import Home from './pages/Home';
import Layout from './pages/Layout';


function App() {
    const [menuItems, setMenuItems] = useState([]);

    // useEffect({
    //     setMenuItems()
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout items={menuItems} />}>
                    <Route index element={<Home />} />
                    <Route path="client" element={<Client />} />
                </Route>
            </Routes>
        </BrowserRouter>
   )
}

export default App
