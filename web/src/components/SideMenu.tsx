import React, { useState } from 'react';

import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

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

    // const menuItems = items.map((item) => {
    //     return createItem(
    //         item.label,
    //         item.label,
    //     );
    // })

    const menuItems = [
        {
          key: 'user',
          label: (
            <h3 style={{fontSize: '26px', marginLeft: '65px'}}>
              {userName}
            </h3>
          ),
        },
        ...items.map((item) => {
          return createItem(item.label, item.label);
        }),
      ];

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="sidemenu">
            <div className="user-info">
            </div>
            <div style={{ width: 256 }}>
                <Button style={{ marginBottom: 16, outline: 'none'}} type="primary" onClick={toggleCollapsed}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                {collapsed ? null : (
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={collapsed}
                        items={menuItems}
                        style={{ 
                            width: '250px', height: '90vh',
                            backgroundColor: '#D9D9D9',
                            borderRadius: '10px'
                    }}
                    >
                    </Menu>
                )}

                        
            </div>
        </div>
    );
}
