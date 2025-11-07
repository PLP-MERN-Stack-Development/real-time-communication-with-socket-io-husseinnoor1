import React, { useEffect, useState, useRef } from 'react'
import { createSocket } from './socket'
import { fetchMessages } from './api'


export default function Chat({ auth }){
const [socket, setSocket] = useState(null);
const [online, setOnline] = useState([]);
const [messages, setMessages] = useState([]);
const [text, setText] = useState('');
const [room, setRoom] = useState('global');
const [typingUsers, setTypingUsers] = useState({});
const listRef = useRef();
const token = auth.token;


useEffect(()=>{
const s = createSocket(token);
setSocket(s);


s.on('online', (users) => setOnline(users));
s.on('notifi