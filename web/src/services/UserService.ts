export interface PostUserData {
    name: string,
    registration: string,
    email: string,
    userType: string

};

export async function postUser(user: PostUserData){
    return await fetch('http://127.0.0.1:8080/users', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response=> response.json())
    .then((data)=> console.log(data))
    .catch(error => console.error(error));
    
}