import { useRef, useState, type FormEvent } from 'react';

type Props = { onAdd: (title: string, subject: string, dueDate?: string) => void };

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;
    onAdd(title.trim(), subject.trim(), dueDate || undefined);
    setTitle('');
    setDueDate('');
    titleRef.current?.focus(); // useRef: devolve o foco ao campo
  };

  return (
    <form className="card form-row" onSubmit={submit}>
      <input ref={titleRef} placeholder="O que você precisa estudar?" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Disciplina" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button className="btn" type="submit">Adicionar tarefa</button>
    </form>
  );
}
