import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const close = () => setOpen(false);

  return (
    <header className="header">
      <NavLink to="/" className="brand" onClick={close}>StudyFlow</NavLink>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Abrir menu">☰</button>
      <nav className={open ? 'nav open' : 'nav'}>
        <NavLink to="/" onClick={close}>Início</NavLink>
        <NavLink to="/dashboard" onClick={close}>Painel</NavLink>
        <NavLink to="/tarefas" onClick={close}>Tarefas</NavLink>
        <NavLink to="/pomodoro" onClick={close}>Pomodoro</NavLink>
        <NavLink to="/sobre" onClick={close}>Sobre</NavLink>
        {user ? (
          <button className="btn small" onClick={() => { logout(); close(); navigate('/'); }}>Sair ({user})</button>
        ) : (
          <NavLink to="/login" onClick={close}>Entrar</NavLink>
        )}
      </nav>
    </header>
  );
}
