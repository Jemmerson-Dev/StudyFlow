import { useState, type FormEvent } from 'react';

type Props = { onLogin: (name: string) => void };

export default function LoginForm({ onLogin }: Props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Informe seu nome.');
    if (password.length < 4) return setError('A senha precisa ter pelo menos 4 caracteres.');
    onLogin(name.trim());
  };

  return (
    <form className="card login" onSubmit={submit}>
      <label>Nome<input value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label>Senha<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit">Entrar</button>
    </form>
  );
}
