import { io } from 'socket.io-client';
const ENDPOINT = (import.meta.env.VITE_API_URL) || 'http://localhost:4000';


export function createSocket(token){
const socket = io(ENDPOINT, { autoConnect: false });
socket.auth = { token };
socket.connect();
socket.on('connect', () => {
socket.emit('auth', token);
});
return socket;
}