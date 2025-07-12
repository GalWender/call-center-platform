import { FormEvent, useState } from 'react';
import IconButton from '../ui/IconButton';

interface Props {
  onSubmit: (title: string) => void;
}

const TaskForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim());
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>New Task</h3>
      <input
        type="text"
        placeholder="Task title…"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="actions">
        <IconButton type="submit" icon="save" label="Save">
          <span>Save</span>
        </IconButton>
      </div>
    </form>
  );
};

export default TaskForm;
