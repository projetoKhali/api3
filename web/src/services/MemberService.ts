import { MemberSchema } from '../schemas/Member';

const API_URL = 'http://127.0.0.1:8000/members';

export async function postMember(member: MemberSchema) {
    return await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(member)
    }).then(response => response.json())
    .then((data) => console.log(`Member added to resultCenter:`, data))
    .catch(error => console.error(error));
}

export async function postMembers(members: MemberSchema[]) {
    return await fetch(`${API_URL}/multi`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(members)
    }).then(response => response.json())
    .then((data) => console.log(`Members added to resultCenters:`, data))
    .catch(error => console.error(error));
}
