import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationItem, getCountNotification } from '../services/AppointmentService';

interface NotificationPopUpProps {
    userId: number;
}

export default function NotificationPopUp({ userId }: NotificationPopUpProps) {
    const [collapsed, setCollapsed] = useState(true);
    const [notificationItems, setNotificationItems] = useState<NotificationItem[]>([]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        getCountNotification(userId).then((notificationItems) => setNotificationItems(notificationItems));
    }, [userId]);

    return (
        <div className="notification">
            <div>
                <button onClick={toggleCollapsed}>
                    {collapsed ? 'Expandir' : 'Recolher'}
                </button>
                {!collapsed && (
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
