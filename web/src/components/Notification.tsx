import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NotificationItem } from '../services/AppointmentService';

interface NotificationPopUpProps {
    notificationItems: NotificationItem[];
    loadNotifications?: () => void;
}

export default function NotificationPopUp({ notificationItems, loadNotifications }: NotificationPopUpProps) {
    const [collapsed, setCollapsed] = useState(true);
    const [loaded, setLoaded] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setCollapsed(true); // Fechar a notificação ao trocar de URL
    }, [location.pathname]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        if (!loaded && loadNotifications) {
            loadNotifications();
            setLoaded(true);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '10px',  // Alterado para posicionar no canto inferior
                right: '10px',   // Mantido para posicionar no canto direito
                backgroundColor: '#ff006f',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                borderRadius: '5px',
                zIndex: '999',
                color: '#fff',
            }}
            className={`notification ${collapsed ? 'hidden' : ''}`}
        >
            <div>
                <button
                    style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#fff',
                    }}
                    onClick={toggleCollapsed}
                >
                    {collapsed ? 'Expandir' : 'X'}
                </button>
                {!collapsed && notificationItems.length > 0 && (
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: '0',
                            margin: '10px 0',
                        }}
                    >
                        {notificationItems.map((item, index) => (
                            <li
                                key={index}
                                style={{
                                    margin: '5px 0',
                                }}
                            >
                                <Link
                                    to={item.url}
                                    style={{
                                        color: '#fff',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
