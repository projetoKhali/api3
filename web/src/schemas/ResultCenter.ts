export interface PostResultCenterSchema {
    name: string,
    code: string,
    acronym: string,
    gestor: {
        id : string
    }
}

export interface ResultCenterSchema {
  id: number;
  name: string;
  code: string;
  acronym: string;
  gestor: {
    name: string;
    referencedColumnName:string;
  }
  insertDate: string;
}
