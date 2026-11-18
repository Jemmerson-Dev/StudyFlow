import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <section>
      <h1>Entrar</h1>
      <p className="muted">Login simulado: use qualquer nome e uma senha com 4 ou mais caracteres.</p>
      <LoginForm onLogin={(name) => { login(name); navigate('/dashboard'); }} />
    </section>
  );
}
