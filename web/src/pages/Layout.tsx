import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NotificationPopUp from '../components/Notification';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import { UserSchema } from "../schemas/User";
import { getUserSideMenuItems } from '../services/Access';
import { NotificationItem, getCountNotification } from '../services/AppointmentService';

interface LayoutProps {
    userLoggedIn: UserSchema;
}

export default function Layout({ userLoggedIn }: LayoutProps) {
    const [menuItems, setMenuItems] = useState<SideMenuItem[]>([]);
    const [notificationItems, setNotificationItems] = useState<NotificationItem[]>([]);

    useEffect(() => {
        getUserSideMenuItems(userLoggedIn.id).then(userSideMenuItems => setMenuItems(userSideMenuItems));
    }, [userLoggedIn]);

    useEffect(() => {
        getCountNotification(userLoggedIn.id).then(useNotificationItems => {
            setNotificationItems(useNotificationItems);
        });
    }, [userLoggedIn]);

    return (
        <>
            <SideMenu items={menuItems} userName={userLoggedIn?.name || ''} />
            {notificationItems.length > 0 && (
                <NotificationPopUp notificationItems={notificationItems} />
            )}
            <div className="content-area">
                <Outlet />
            </div>
        </>
    );
}
