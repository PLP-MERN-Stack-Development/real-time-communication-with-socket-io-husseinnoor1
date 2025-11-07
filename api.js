const API = (process.env.VITE_API_URL) || 'http://localhost:4000';
export async function login(username){
const r = await fetch(API + '/api/login', {
method: 'POST',
headers: { 'content-type': 'application/json' },
body: JSON.stringify({ username })
});
return r.json();
}


export async function fetchMessages(room='global', before=Date.now(), limit=20){
const q = `?room=${encodeURIComponent(room)}&before=${before}&limit=${limit}`;
const r = await fetch(API + '/api/messages' + q);
return r.json();
}


export default API;