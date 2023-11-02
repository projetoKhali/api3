import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationItem } from '../services/AppointmentService';

interface NotificationPopUpProps {
    notificationItems: NotificationItem[];
    loadNotifications?: () => void;
}

export default function NotificationPopUp({ notificationItems, loadNotifications }: NotificationPopUpProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        if (!loaded && loadNotifications) {
            loadNotifications();
            setLoaded(true);
        }
    };

    return (
        <div className={`notification ${notificationItems.length === 0 ? 'hidden' : ''}`}>
            <div>
                <button onClick={toggleCollapsed}>
                    {collapsed ? 'Expandir' : 'X'}
                </button>
                {!collapsed && notificationItems.length > 0 && (
                    <ul>
                        {notificationItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.url}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
