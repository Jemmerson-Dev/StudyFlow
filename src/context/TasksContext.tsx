import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';
import type { Task } from '../types';

export type Action =
  | { type: 'add'; task: Task }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string };

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add':
      return [action.task, ...state];
    case 'toggle':
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'remove':
      return state.filter((t) => t.id !== action.id);
  }
}

const load = (): Task[] => {
  try {
    return JSON.parse(localStorage.getItem('studyflow-tasks') ?? '[]') as Task[];
  } catch {
    return [];
  }
};

const TasksContext = createContext<{ tasks: Task[]; dispatch: Dispatch<Action> } | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(reducer, [], load);

  useEffect(() => {
    localStorage.setItem('studyflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  return <TasksContext.Provider value={{ tasks, dispatch }}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks precisa estar dentro de TasksProvider');
  return ctx;
}
