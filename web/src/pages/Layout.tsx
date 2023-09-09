import { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { SideMenuItem } from '../components/SideMenu';
import { GetSideMenuItems, UserType } from '../services/Access';

export default function Layout(){
    const [menuItems, setMenuItems] = useState<SideMenuItem[]>([]);

    useEffect(() => {
        setMenuItems(
            // GetSideMenuItems(UserType.Employee)
            // GetSideMenuItems(UserType.Manager)
            GetSideMenuItems(UserType.Admin)
        );
    }, []);

    return (
        <>
            <SideMenu items={menuItems} />
            <div className="content-area" >
                <Outlet />
            </div>
        </>
    )
}
