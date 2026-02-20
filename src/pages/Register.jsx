import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', username: '', displayName: '' });

  async function submit(e) {
    e.preventDefault();
    const { data } = await api.post('/auth/register', form);
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  }

  return (
    <div className="container card">
      <h2>Create Account</h2>
      <form onSubmit={submit}>
        <input placeholder="Display Name" onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
        <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
}
