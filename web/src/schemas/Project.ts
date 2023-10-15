export interface PostProjectSchema {
    name: string,
    description: string,
}

export interface ProjectSchema {
    id: number;
    name: string,
    description: string,
    active: string,
    insert_date: string,
    expire_date: string
}
