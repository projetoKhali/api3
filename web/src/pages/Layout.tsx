import { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { SideMenuItem } from '../components/SideMenu';

export default function Layout(){
    const [menuItems, setMenuItems] = useState<SideMenuItem[]>([]);

    useEffect(() => {
        setMenuItems([
            {
                label: "test 1",
                url: "#1",
            },
            {
                label: "test 2",
                url: "#2",
            },
        ] as SideMenuItem[]);
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
