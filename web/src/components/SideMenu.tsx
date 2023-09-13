import React, { useState } from 'react';

import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
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
}

export default function SideMenu ({items}: SideMenuProps) {
    const [collapsed, setCollapsed] = useState(true);

    const menuItems = items.map((item) => {
        return createItem(
            item.label,
            item.label,
        );
    })

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="sidemenu">
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                {collapsed ? null : (
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={menuItems}
                    />
                )}
            </div>
        </div>
    );
}
