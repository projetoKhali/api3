import axios, { AxiosResponse } from 'axios';
import { PostUserSchema, UserSchema } from '../schemas/User';


const API_URL = 'http://127.0.0.1:8080/users';

async function mapResponse(response: AxiosResponse) {
    return response.data.map((item: any) => ({
        id: item.id,
        name: item.name ? item.name : "N/A",
        registration: item.registration ? item.registration : "N/A",
        userType: item.userType ? item.userType : "N/A",
        email: item.email ? item.email : "N/A",
        password: item.password ? item.password : "N/A",
        active: item.expiredDate === null ? "Ativo" : "Desativado",
        insertDate: item.insertDate ? item.insertDate : "N/A",
        expiredDate: item.expiredDate === null ? "N/A" : item.expireDate,
    })) as UserSchema[]
}

export async function requestLogin(email: string, password: string): Promise<UserSchema | null> {
    try {
        const response = await axios.get(`${API_URL}/login?email=${email}&password=${password}`);
        const userData = response.data;

        if (userData && userData.id && userData.name && userData.email) {
            const user: UserSchema = {
                id: userData.id,
                name: userData.name,
                registration: userData.registration || "N/A",
                userType: userData.userType || "N/A",
                email: userData.email,
                password: userData.password || "N/A",
                insertDate: userData.insertDate || "N/A",
                expiredDate: userData.expiredDate || "N/A",
            };

            return user;
        } else {
            console.error("Resposta da API não possui os campos necessários.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return null;
    }
}

export async function getUsers(): Promise<UserSchema[]> {
    const response = await axios.get(`${API_URL}`, {});
    return await mapResponse(response);
}

export async function getUsersOfType(userType: string): Promise<UserSchema[]> {
    const response = await axios.get(`${API_URL}/usertype/${userType}`, {});
    return await mapResponse(response);

}

export async function postUser(user: PostUserSchema) {
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

export async function updateUserActiveStatus(user: UserSchema, newActiveStatus: boolean) {
    let response = null;
    let endpoint = newActiveStatus ? 'activate' : 'deactivate';

    try {
        response = await fetch(`${API_URL}/${user.id}/${endpoint}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response || !response.ok) {
            throw new Error(`Erro ao atualizar o usuário: ${response ? response.statusText : 'Resposta não recebida'}`);
        }

        return response.json();
    } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        throw error;
    }
}
export async function updatePassword(id: number, password: string) {
    let response = null;
    // let endpoint = newActiveStatus ? 'activate' : 'deactivate';

    try {
        response = await fetch(`${API_URL}/${id}/updatePassword`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: password
        });
        
        if (!response || !response.ok) {
            throw new Error(`Erro ao atualizar senha do usuário: ${response ? response.statusText : 'Resposta não recebida'}`);
        }
        
        return response.json();
    } catch (error) {
        console.error("Erro ao atualizar senha do usuário:", error);
        throw error;
    }
}
