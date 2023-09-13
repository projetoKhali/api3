import { SideMenuItem } from "../components/SideMenu";
export enum UserType {
    Employee,
    Manager,
    Admin,
}

export function GetSideMenuItems (userType: UserType) {
    if (userType === UserType.Employee) {
        return [
            {
                label: "Apontamentos",
                url: "#",
            },
            {
                label: "Dashboard",
                url: "#"
            },
        ] as SideMenuItem[];
    }
    else if (userType === UserType.Manager) {
        return [
            {
                label: "Aprovações",
                url: "#",
            },
            {
                label: "Dashboard",
                url: "#"
            },
        ] as SideMenuItem[];
    }
    else if (userType === UserType.Admin) {
        return [

            {
                label: "Usuários",
                url: "#",
            },
            {
                label: "Centros de Resultado",
                url: "#"
            },
            {
                label: "Clientes",
                url: "#"
            },
            {
                label: "Projetos",
                url: "#"
            },
            {
                label: "Relatório",
                url: "#"
            },
            {
                label: "Dashboard",
                url: "#"
            },
        ] as SideMenuItem[];
    }
    console.error(`Services.Access.GetSideMenuItems -- Error: Acessos do menu lateral não foram configurados para o UserType \`${userType}\``);
    return [];
}
