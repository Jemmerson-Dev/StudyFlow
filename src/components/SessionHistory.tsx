import type { Session } from '../types';

export default function SessionHistory({ sessions }: { sessions: Session[] }) {
  if (sessions.length === 0) return <p className="empty">Nenhuma sessão concluída ainda. Complete um ciclo de 25 minutos.</p>;
  return (
    <ul className="history">
      {sessions.map((s) => (
        <li key={s.id}>{s.minutes} min de foco <small>{new Date(s.finishedAt).toLocaleString('pt-BR')}</small></li>
      ))}
    </ul>
  );
}
