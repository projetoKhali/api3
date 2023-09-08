import { Outlet } from 'react-router-dom';
import SideMenu from '../components/SideMenu';

export default function Layout(){
    return (
        <>
            <SideMenu />
            <div className="content-area" >
                <Outlet />
            </div>
        </>
    )
}
