import { useCallback } from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import SessionHistory from '../components/SessionHistory';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Session } from '../types';

export default function Pomodoro() {
  const [sessions, setSessions] = useLocalStorage<Session[]>('studyflow-sessions', []);

  const addSession = useCallback((minutes: number) => {
    setSessions((prev) => [{ id: crypto.randomUUID(), minutes, finishedAt: new Date().toISOString() }, ...prev]);
  }, [setSessions]);

  return (
    <section>
      <h1>Pomodoro</h1>
      <PomodoroTimer onComplete={addSession} />
      <h2>Sessões concluídas</h2>
      <SessionHistory sessions={sessions} />
    </section>
  );
}
