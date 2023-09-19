import { SideMenuItem } from "../components/SideMenu";
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080';

const PermissionSideMenuItemMap: Record<string, SideMenuItem[]> = {
    "": [
        {
            label: "Dashboard",
            url: "#",
        },
    ],
    "Appoint": [
        {
            label: "Apontamentos",
            url: "#",
        },
    ],
    "Validate": [
        {
            label: "Aprovações",
            url: "#"
        },
    ],
    "Register": [
        {
            label: "Usuários",
            url: "/users/",
        },
        {
            label: "Centros de Resultado",
            url: "/resultcenters/"
        },
        {
            label: "Clientes",
            url: "#"
        },
        {
            label: "Projetos",
            url: "#"
        },
    ],
    "Report": [
        {
            label: "Relatório",
            url: "#"
        },
    ]
}

export async function getUserSideMenuItems (id: number): Promise<SideMenuItem[]> {
    const response = await axios.get(`${API_URL}/users/${id}/permissions/`, {});
    const items: SideMenuItem[] = [];
    response.data.forEach((permission: string) => {
        const sideMenuItemsOfPermission: SideMenuItem[] | undefined = PermissionSideMenuItemMap[permission];
        if (sideMenuItemsOfPermission) {
            items.push(...sideMenuItemsOfPermission);
        }
    });
    return items;
}
