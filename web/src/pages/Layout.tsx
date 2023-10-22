import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NotificationPopUp from '../components/Notification';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import { UserSchema } from "../schemas/User";
import { getUserSideMenuItems } from '../services/Access';

interface LayoutProps {
    userLoggedIn: UserSchema;
}

export default function Layout({ userLoggedIn }: LayoutProps) {
    const [menuItems, setMenuItems] = useState<SideMenuItem[]>([]);

    useEffect(() => {
        getUserSideMenuItems(userLoggedIn.id).then(userSideMenuItems => setMenuItems(userSideMenuItems));
    }, [userLoggedIn]);

    return (
        <>
            <SideMenu items={menuItems} userName={userLoggedIn?.name || ''} />
            <NotificationPopUp userId={userLoggedIn.id} />
            <div className="content-area" >
                <Outlet />
            </div>
        </>
    )
}
