import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu, { SideMenuItem } from '../components/SideMenu';
import { UserSchema } from "../schemas/User";
import { getUserSideMenuItems } from '../services/Access';

interface LayoutProps {
    userLoggedIn: UserSchema ; // Receba o usuário como prop
  }
  

export default function Layout({userLoggedIn}: LayoutProps) {
    console.log(userLoggedIn)
    const [menuItems, setMenuItems] = useState<SideMenuItem[]>([]);
    // const [user, setUser] = useState<UserSchema | undefined>(undefined);

    useEffect(() => {{
            getUserSideMenuItems(userLoggedIn.id).then(userSideMenuItems => setMenuItems(userSideMenuItems));
        }
    }, [userLoggedIn]);

    return (
        <>
            <SideMenu items={menuItems} userName={userLoggedIn?.name || ''}/>
            <div className="content-area" >
                <Outlet />
            </div>
        </>
    )
}
