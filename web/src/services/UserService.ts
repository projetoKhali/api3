import axios, { AxiosResponse } from 'axios';
import { PostUserSchema, UserSchema } from '../schemas/User';

const API_URL = 'http://127.0.0.1:8080/users';

async function mapResponse (response: AxiosResponse) {
    return response.data.map((item: any) => ({
        id: item.id,
        name: item.name? item.name : "N/A",
        registration: item.registration? item.registration : "N/A",
        userType: item.userType? item.userType : "N/A",
        email: item.email? item.email : "N/A",
        password: item.password? item.password : "N/A",
        active: item.active? item.active : "N/A",
        insertDate: item.insertDate? item.insertDate : "N/A",
        expireDate: item.expireDate? item.expireDate : "N/A",
    })) as UserSchema[]
}

export async function requestLogin (email: string, password: string): Promise<UserSchema> {
    return await axios.get(`${API_URL}/login`, {
        data: {
            email,
            password,
        }
    }) as UserSchema;
}

export async function getUsers (): Promise<UserSchema[]> {
    const response = await axios.get(`${API_URL}`, {});
    return await mapResponse(response);
}

export async function postUser(user: PostUserSchema){
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(error => console.error(error));
}
