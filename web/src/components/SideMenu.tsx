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
//
// const items: MenuItem[] = [
//   getItem('Option 1', '1'),
// ];

export interface SideMenuItem {
    label: string,
    url: string,
}

export interface SideMenuProps {
    items: SideMenuItem[],
}

export default function SideMenu ({items}: SideMenuProps) {
    const [collapsed, setCollapsed] = useState(false);

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
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={[]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={menuItems}
                />
            </div>
        </div>
    );
}
