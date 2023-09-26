export interface PostUserSchema {
    name: string,
    registration: string,
    email: string,
    userType: string
}
export interface UserSchema {
  id: number;
  name: string;
  registration: string;
  userType: string;
  email: string;
  password: string;
  active: string;
  insertDate: string;
  expireDate: string;
}
