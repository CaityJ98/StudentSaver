const baseUrl = 'https://student-saver-server.herokuapp.com';


export async function registerUser(userData) {
 
   const response = await fetch('https://student-saver-server.herokuapp.com/auth/register', {
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
    });
    // console.log(response)
    
   return response.json();
}


export async function loginUser(userData = {} ) {
    const response = await fetch('https://student-saver-server.herokuapp.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
    });
    return response.json()
  
}

export async function getUser() {
    const response = await fetch('https://student-saver-server.herokuapp.com/auth/getUser', {credentials: 'include'});
    return response.json();
}

export async function getUserCurrentListings(id) {
    const response = await fetch(`${baseUrl}/listings/sells/active/${id}`, {credentials: 'include'});
    return response.json();
}

export async function getUserArchivedListings() {
    const response = await fetch(`${baseUrl}/listings/sells/archived`, {credentials: 'include'});
    return response.json();
}


export async function editUserProfile(id, data) {
    const response = await fetch(`/user/edit-profile/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    response.json();
}

export async function getUserById(id) {
    const response = await fetch(baseUrl + `/user/getUserById/${id}`, {credentials: 'include'});
    return response.json()
}