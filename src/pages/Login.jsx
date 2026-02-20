import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  async function submit(e) {
    e.preventDefault();
    const { data } = await api.post('/auth/login', form);
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  }

  return (
    <div className="container card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}
