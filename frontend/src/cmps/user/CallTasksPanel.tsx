import Select from 'rc-select';
import 'rc-select/assets/index.css';
import { useUpdateCall } from '../../hooks/call.hooks';
import IconButton from '../ui/IconButton';
import Panel from '../ui/Panel';
import { TaskStatus, type Task } from '../../types/task';
import { useModal } from '../../context/ModalContext';
import TaskForm from './TaskForm';

interface Props {
  callId: string;
  tasks: Task[];
}

const CallTasksPanel = ({ callId, tasks }: Props) => {
  const updateCall = useUpdateCall();
  const { openModal, closeModal } = useModal();

  const saveTasks = (newTasks: Task[]) =>
    updateCall.mutate({ id: callId, data: { tasks: newTasks } });

  const addTask = (title: string) => {
    const newTasks = [...tasks, { title, status: TaskStatus.OPEN }];
    saveTasks(newTasks);
    closeModal();
  };

  const changeStatus = (idx: number, status: TaskStatus) => {
    const newTasks = tasks.map((t, i) => (i === idx ? { ...t, status } : t));
    saveTasks(newTasks);
  };

  const openAddModal = () => openModal(<TaskForm onSubmit={addTask} />);

  return (
    <Panel
      title="Tasks"
      className="call-tasks-panel"
      actions={<IconButton icon="add" label="Add task" onClick={openAddModal} />}
    >
      <ul className="task-list">
        {tasks.map((t, idx) => (
          <li key={idx} className="task-item">
            <span>{t.title}</span>
            <Select
              value={t.status}
              onChange={value => changeStatus(idx, value as TaskStatus)}
              options={Object.values(TaskStatus).map(s => ({
                value: s,
                label: s.replace('_', ' '),
              }))}
              dropdownMatchSelectWidth={false}
              className="task-status-select"
            />
          </li>
        ))}
      </ul>
    </Panel>
  );
};

export default CallTasksPanel;
