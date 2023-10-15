export interface PostUserSchema {
    name: string,
    registration: string,
    email: string,
    userType: string,
    expiredDate: string;
}
export interface UserSchema {
    id: number;
    name: string;
    registration: string;
    userType: string;
    email: string;
    password: string;
    insertDate: string;
    expiredDate: string;
}
