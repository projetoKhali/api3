import axios from 'axios';
import { SideMenuItem } from "../components/SideMenu";

const API_URL = 'http://127.0.0.1:8080/users';

const PermissionSideMenuItemMap: Record<string, SideMenuItem[]> = {
    "": [
        // {
        //     label: "Dashboard",
        //     url: "#",
        // },
    ],
    "Appoint": [
        {
            label: "Apontamentos",
            url: '/appointments/user',
        },
    ],
    "Validate": [
        {
            label: "Aprovações",
            url: "/appointments/manager"
        },
    ],
    "Register": [
        {
            label: "Usuários",
            url: "/users",
        },
        {
            label: "Centros de Resultado",
            url: '/resultcenters'
        },
        {
            label: "Clientes",
            url: "/clients"
        },
        {
            label: "Projetos",
            url: "/projects"
        },
    ],
    "Report": [
        // {
        //     label: "Relatório",
        //     url: "#"
        // },
    ],
    "FullAccess": [
        {
            label: "Apontamentos Geral",
            url:   'http://localhost:7000/Appointments' }
    ]
}

export async function getUserSideMenuItems (id: number): Promise<SideMenuItem[]> {
    return await axios.get(`${API_URL}/${id}/permissions`, {})
    .then(permissionsResponse => {
        console.log(permissionsResponse);
        const items: SideMenuItem[] = [];
        permissionsResponse.data.forEach((permission: string) => {
            console.log("permission:", permission);
            const sideMenuItemsOfPermission: SideMenuItem[] | undefined = PermissionSideMenuItemMap[permission];
            console.log("sideMenuItemsOfPermission:", sideMenuItemsOfPermission);
            if (sideMenuItemsOfPermission) {
                items.push(...sideMenuItemsOfPermission);
            }
        });
        console.log("items:", items);
        return items;
    })
}
