import { useEffect, useRef, useState } from 'react';

type Mode = 'focus' | 'break';
const MINUTES: Record<Mode, number> = { focus: 25, break: 5 };

type Props = { onComplete: (minutes: number) => void };

export default function PomodoroTimer({ onComplete }: Props) {
  const [mode, setMode] = useState<Mode>('focus');
  const [seconds, setSeconds] = useState(MINUTES.focus * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Liga e desliga o intervalo conforme "running" muda.
  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  // Quando chega a zero, registra a sessão e troca de modo.
  useEffect(() => {
    if (seconds > 0) return;
    if (mode === 'focus') onComplete(MINUTES.focus);
    const next: Mode = mode === 'focus' ? 'break' : 'focus';
    setMode(next);
    setSeconds(MINUTES[next] * 60);
    setRunning(false);
  }, [seconds, mode, onComplete]);

  const reset = () => { setRunning(false); setSeconds(MINUTES[mode] * 60); };
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="card timer">
      <p>{mode === 'focus' ? 'Hora de focar' : 'Pausa curta'}</p>
      <div className="clock">{mm}:{ss}</div>
      <div className="row">
        <button className="btn" onClick={() => setRunning(!running)}>{running ? 'Pausar' : 'Iniciar'}</button>
        <button className="btn ghost" onClick={reset}>Reiniciar</button>
      </div>
    </div>
  );
}
