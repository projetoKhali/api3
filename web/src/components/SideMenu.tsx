import type { MenuProps } from 'antd';
import { Button, Menu, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/menuStyle.css';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function createItem (
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
  return {
    key,
    children,
    label,
    type,
  } as MenuItem;
}

export interface SideMenuItem {
    label: string,
    url: string,
}

export interface SideMenuProps {
    items: SideMenuItem[],
    userName: string
}

export default function SideMenu ({items, userName}: SideMenuProps) {
    const [collapsed, setCollapsed] = useState(true);
    const [shortenedUserName, setShortenedUserName] = useState(userName);
    const [showFullUserName, setShowFullUserName] = useState(false);

    useEffect(() => {
        const maxUserNameLength = 15;
        if (userName.length > maxUserNameLength) {
            const shortenedName = userName.substring(0, maxUserNameLength - 3) + '...';
            setShortenedUserName(shortenedName);
        } else {
            setShortenedUserName(userName);
        }
    }, [userName]);

    const menuItems = [
        ...items.map((item) => {
            return (
                <Menu.Item key={item.label}>
                    <Link to={item.url}>{item.label}</Link> {}
                </Menu.Item>
            );
        }),
    ];

    const handleMouseEnter = () => {
        if (userName.length > 10) {
            setShowFullUserName(true);
        }
    };

    const handleMouseLeave = () => {
        setShowFullUserName(false);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="sidemenu">
            <div className="sidemenu-content">
                <Button
                    className="sidemenu-button"
                    type="primary"
                    onClick={toggleCollapsed}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                {collapsed ? null : (
                    <div className={`userName ${showFullUserName ? 'userNameHovered' : ''}`}>
                    <Tooltip title={userName} placement="right">
                        <span
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            id="user"
                            style={{ fontWeight: 'bold' }}
                        >
                            {shortenedUserName}
                        </span>
                    </Tooltip>
                    </div>
                )}
                {collapsed ? null : (
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={collapsed}
                        style={{
                            width: '250px', height: '90vh',
                            backgroundColor: '#D9D9D9',
                            borderRadius: '10px',
                        }}
                    >
                        {menuItems} {/* Renderize os itens do menu aqui */}
                    </Menu>
                )}
            </div>
        </div>
    );
}
