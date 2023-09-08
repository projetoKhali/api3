import { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';

export default function Layout(){
    const [menuItems, setMenuItems] = useState([]);

    // useEffect({
    //     setMenuItems()
    // }, []);

    return (
        <>
            <SideMenu items={menuItems} />
            <div className="content-area" >
                <Outlet />
            </div>
        </>
    )
}
