export interface PostResultCenterSchema {
    name: string,
    code: number,
    acronym: string,
    gestor: {
        id : number
    },
}

export interface ResultCenterSchema {
    id: number;
    name: string;
    code: number;
    acronym: string;
    gestor: {
        id: number;
        name: string;
    },
    insertDate: string;
}
