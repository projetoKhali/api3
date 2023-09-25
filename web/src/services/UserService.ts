import axios from 'axios';
import User from '../models/User';
import { GetUserSchema, PostUserSchema } from '../schemas/User';

const API_URL = 'http://127.0.0.1:8080/users';

export async function getUsers (): Promise<User[]> {
    const response = await axios.get(`${API_URL}`, {});
    return await response.data.map((item: GetUserSchema) => ({
        key: item.id.toString(),
        name: item.name? item.name : "N/A",
        registration: item.registration? item.registration : "N/A",
        userType: item.userType? item.userType : "N/A",
        email: item.email? item.email : "N/A",
        password: item.password? item.password : "N/A",
        active: item.active? item.active : "N/A",
        insertDate: item.insertDate? item.insertDate : "N/A",
        expireDate: item.expireDate? item.expireDate : "N/A",
    })) as User[];
}

// export async function getUsersId(): Promise<string> {
//         const response = await axios.get(`${API_URL}/name`);
//         const userId = response.data.id;
//         return String<userId>;
// }

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
