import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type NotificationItem = {
    key: React.Key;
    label: React.ReactNode;
    url: string; // Adicione a propriedade 'url'
    children?: NotificationItem[];
    type?: 'group';
};

export interface NotificationProps {
    items: NotificationItem[];
}

export default function NotificationPopUp({ items }: NotificationProps) {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="sidemenu">
            <div>
                <Button type="primary" onClick={toggleCollapsed}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                {collapsed ? null : (
                    <Menu>
                        {items.map((item) => (
                            <Menu.Item key={item.key}>
                                <Link to={item.url}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                )}
            </div>
        </div>
    );
}
