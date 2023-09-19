export default interface ResultCenterData {
  key: string;
  name: string;
  code: string;
  acronym: string;
  gestor: {
    name: string;
    referencedColumnName:string;
  }
  insertDate: string;
}
