import axios from 'axios';
import UserData from '../shared/UserData';

const API_URL = 'http://127.0.0.1:8080/users';

export interface PostUserData {
    name: string,
    registration: string,
    email: string,
    userType: string
}

export async function getUsers (): Promise<UserData[]> {
    const response = await axios.get(API_URL, {});
    return await response.data.map((item: any) => ({
        key: item.id.toString(), 
        name: item.name? item.name : "N/A",
        registration: item.registration? item.registration : "N/A",
        userType: item.userType? item.userType : "N/A",
        email: item.email? item.email : "N/A",
        password: item.password? item.password : "N/A",
        active: item.active? item.active : "N/A",
        insertDate: item.insertDate? item.insertDate : "N/A",
        expireDate: item.expireDate? item.expireDate : "N/A",
    })) as UserData[];
}

export async function postUser(user: PostUserData){
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response=> response.json())
    .then((data)=> {
        console.log(data);
        fetch(`${API_URL}/${data.id}/permissions`, {
            method: 'GET',
            headers: { 'Content-Type': 'applicataion/json' }
        }).then(data => console.log(data.json()))
        .then(data => console.log(data))
    })
    .catch(error => console.error(error));
    
}
