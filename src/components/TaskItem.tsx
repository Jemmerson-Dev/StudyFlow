import type { Task } from '../types';

type Props = { task: Task; onToggle: (id: string) => void; onRemove: (id: string) => void };

export default function TaskItem({ task, onToggle, onRemove }: Props) {
  return (
    <li className={task.done ? 'task done' : 'task'}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} aria-label={`Concluir ${task.title}`} />
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        <small>{task.subject}{task.dueDate ? ` · entrega em ${new Date(task.dueDate + 'T00:00').toLocaleDateString('pt-BR')}` : ''}</small>
      </div>
      <button className="btn ghost small" onClick={() => onRemove(task.id)}>Excluir</button>
    </li>
  );
}
