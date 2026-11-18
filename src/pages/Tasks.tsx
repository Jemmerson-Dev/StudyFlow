import { useMemo, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TasksContext';

type Filter = 'all' | 'pending' | 'done';

export default function Tasks() {
  const { tasks, dispatch } = useTasks();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(
    () => tasks.filter((t) => (filter === 'all' ? true : filter === 'done' ? t.done : !t.done)),
    [tasks, filter]
  );

  return (
    <section>
      <h1>Tarefas</h1>
      <TaskForm onAdd={(title, subject, dueDate) =>
        dispatch({ type: 'add', task: { id: crypto.randomUUID(), title, subject, dueDate, done: false } })} />
      <div className="row filters">
        {(['all', 'pending', 'done'] as Filter[]).map((f) => (
          <button key={f} className={filter === f ? 'btn small' : 'btn ghost small'} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendentes' : 'Concluídas'}
          </button>
        ))}
      </div>
      <TaskList tasks={visible} onToggle={(id) => dispatch({ type: 'toggle', id })} onRemove={(id) => dispatch({ type: 'remove', id })} />
    </section>
  );
}
