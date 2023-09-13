import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import { GetSideMenuItems, UserType } from '../services/Access';

export default function Layout(){
    const [menuItems, setMenuItems] = useState<SideMenuItem[]>([]);
    const [userName, setUserName] = useState<string>("User");
    
    useEffect(() => {
        setMenuItems(
            // GetSideMenuItems(UserType.Employee)
            // GetSideMenuItems(UserType.Manager)
            GetSideMenuItems(UserType.Admin)
        );
    }, []);

    return (
        <>
            <SideMenu items={menuItems} userName={userName}/>
            <div className="content-area" >
                <Outlet />
            </div>
        </>
    )
}
