import { useMemo } from 'react';
import HolidayList from '../components/HolidayList';
import ProgressBar from '../components/ProgressBar';
import StatCard from '../components/StatCard';
import { useTasks } from '../context/TasksContext';
import { useFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Holiday, Session } from '../types';

export default function Dashboard() {
  const { tasks } = useTasks();
  const [sessions] = useLocalStorage<Session[]>('studyflow-sessions', []);

  // Integração com API real (BrasilAPI): feriados nacionais do ano atual.
  const year = new Date().getFullYear();
  const { data: holidays, loading, error } = useFetch<Holiday[]>(`https://brasilapi.com.br/api/feriados/v1/${year}`);

  const upcoming = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return (holidays ?? []).filter((h) => h.date >= today).slice(0, 5);
  }, [holidays]);

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.done).length;
    const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
    const bySubject: Record<string, { total: number; done: number }> = {};
    tasks.forEach((t) => {
      bySubject[t.subject] ??= { total: 0, done: 0 };
      bySubject[t.subject].total += 1;
      if (t.done) bySubject[t.subject].done += 1;
    });
    return { done, percent, bySubject };
  }, [tasks]);

  return (
    <section>
      <h1>Painel</h1>
      <div className="stats">
        <StatCard label="Tarefas" value={tasks.length} />
        <StatCard label="Concluídas" value={stats.done} />
        <StatCard label="Pendentes" value={tasks.length - stats.done} />
        <StatCard label="Minutos focados" value={sessions.reduce((sum, s) => sum + s.minutes, 0)} />
      </div>
      <h2>Progresso geral</h2>
      <ProgressBar label="Todas as disciplinas" percent={stats.percent} />
      <h2>Por disciplina</h2>
      {Object.keys(stats.bySubject).length === 0 && <p className="empty">Adicione tarefas para ver o progresso por disciplina.</p>}
      {Object.entries(stats.bySubject).map(([subject, v]) => (
        <ProgressBar key={subject} label={subject} percent={Math.round((v.done / v.total) * 100)} />
      ))}
      <h2>Próximos feriados</h2>
      <p className="muted">Útil para planejar entregas e provas.</p>
      {loading && <p className="empty">Carregando feriados...</p>}
      {error && <p className="error">{error} Verifique sua conexão e recarregue a página.</p>}
      {!loading && !error && <HolidayList holidays={upcoming} />}
    </section>
  );
}
