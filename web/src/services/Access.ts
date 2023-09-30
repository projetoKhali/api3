import { SideMenuItem } from "../components/SideMenu";
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

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
            url: "/appointments/user",
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
            url: "/resultcenters"
        },
        {
            label: "Clientes",
            url: "/clients"
        },
        // {
        //     label: "Projetos",
        //     url: "#"
        // },
    ],
    "Report": [
        // {
        //     label: "Relatório",
        //     url: "#"
        // },
    ],
    "FullAccess": [
        {
            label: "Apontaments ADM",
            url: "/appointments"
        }
    ]
}

export async function getUserSideMenuItems (id: number): Promise<SideMenuItem[]> {
    return await axios.get(`${API_URL}/users/${id}/permissions`, {})
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
