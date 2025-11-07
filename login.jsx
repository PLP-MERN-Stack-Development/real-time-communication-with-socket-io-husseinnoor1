import React, { useState } from 'react'
import { login } from './api'


export default function Login({ onLogin }){
const [name, setName] = useState('');
const [err, setErr] = useState(null);
async function submit(e){
e.preventDefault();
if (!name) return setErr('Enter a username');
const res = await login(name.trim());
if (res.token) onLogin(res);
else setErr(res.error || 'Login failed');
}
return (
<div className="login">
<h2>Sign in</h2>
<form onSubmit={submit}>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Username" />
<button>Join</button>
</form>
{err && <div className="error">{err}</div>}
</div>
)
}