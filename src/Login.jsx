import React, { useState } from 'react';

export default function Login({ onLogin, busy }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submit(event) {
    event.preventDefault();
    onLogin({ username, password });
  }

  return (
    <form className="panel login" onSubmit={submit}>
      <h2>Login</h2>
      <label>Username
        <input name="username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required />
      </label>
      <label>Password
        <input name="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button disabled={busy}>{busy ? 'Logging in...' : 'Login'}</button>
    </form>
  );
}
