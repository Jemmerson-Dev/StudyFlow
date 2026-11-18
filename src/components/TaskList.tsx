import type { Task } from '../types';
import TaskItem from './TaskItem';

type Props = { tasks: Task[]; onToggle: (id: string) => void; onRemove: (id: string) => void };

export default function TaskList({ tasks, onToggle, onRemove }: Props) {
  if (tasks.length === 0) return <p className="empty">Nenhuma tarefa por aqui. Adicione a primeira acima.</p>;
  return (
    <ul className="task-list">
      {tasks.map((t) => <TaskItem key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />)}
    </ul>
  );
}
