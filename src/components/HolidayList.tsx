import type { Holiday } from '../types';

export default function HolidayList({ holidays }: { holidays: Holiday[] }) {
  if (holidays.length === 0) return <p className="empty">Não há mais feriados nacionais este ano.</p>;
  return (
    <ul className="history">
      {holidays.map((h) => (
        <li key={h.date}>
          {h.name}
          <small>{new Date(h.date + 'T00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</small>
        </li>
      ))}
    </ul>
  );
}
