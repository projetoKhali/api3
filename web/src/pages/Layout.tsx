import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Importe useLocation
import NotificationPopUp from '../components/Notification';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import { UserSchema } from "../schemas/User";
import { getUserSideMenuItems } from '../services/Access';
import { NotificationItem, getCountNotification, putNotification } from '../services/AppointmentService';

interface LayoutProps {
    userLoggedIn: UserSchema;
}

export default function Layout({ userLoggedIn }: LayoutProps) {
    const [menuItems, setMenuItems] = useState<SideMenuItem[]>([]);
    const [notificationItems, setNotificationItems] = useState<NotificationItem[]>([]);

    const location = useLocation(); // Obtenha a localização atual

    useEffect(() => {
        getUserSideMenuItems(userLoggedIn.id).then(userSideMenuItems => setMenuItems(userSideMenuItems));
    }, [userLoggedIn]);

    useEffect(() => {
        // Função para carregar notificações
        const loadNotifications = async () => {
            try {
                const useNotificationItems = await getCountNotification(userLoggedIn.id);
                setNotificationItems(useNotificationItems);
            } catch (error) {
                // Lidar com erros, exibir uma mensagem de erro, etc.
            }
        };

        // Marcar notificações como lidas quando a tela é recarregada
        const markNotificationsAsReadOnReload = async () => {
            try {
                await putNotification(userLoggedIn.id);
            } catch (error) {
                // Lidar com erros, exibir uma mensagem de erro, etc.
            }
        };

        // Chame a função para carregar notificações sempre que a rota for alterada
        loadNotifications();

        // Chame a função para marcar notificações como lidas quando a tela é recarregada
        markNotificationsAsReadOnReload();

        // Limpe as notificações quando o componente é desmontado
        return () => {
            setNotificationItems([]);
        };
    }, [userLoggedIn, location]);

    return (
        <>
            <SideMenu items={menuItems} userName={userLoggedIn?.name || ''} />
            <div className="content-area">
                <Outlet />
            </div>
            {notificationItems.length > 0 && (
                <NotificationPopUp notificationItems={notificationItems} />
            )}
        </>
    );
}
