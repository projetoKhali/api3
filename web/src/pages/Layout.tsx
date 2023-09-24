import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import { getUserSideMenuItems } from '../services/Access';

export default function Layout(){
    const [menuItems, setMenuItems] = useState<SideMenuItem[]>([]);
    // const [userName, setUserName] = useState<string>("Paulina Cruz Granthon");

    useEffect(() => {
        getUserSideMenuItems(1).then(userSideMenuItems => setMenuItems(userSideMenuItems));
    }, []);

    return (
        <>
            <SideMenu items={menuItems} userName={"Paulina Cruz Granthon"}/>
            <div className="content-area" >
                <Outlet />
            </div>
        </>
    )
}
