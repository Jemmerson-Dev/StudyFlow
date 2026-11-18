import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <section className="hero">
      <h1>Menos caos, mais estudo.</h1>
      <p>Organize tarefas por disciplina, foque com o Pomodoro e acompanhe seu progresso em um só lugar.</p>
      <Link className="btn" to={user ? '/tarefas' : '/login'}>{user ? 'Ver minhas tarefas' : 'Entrar para começar'}</Link>
    </section>
  );
}
