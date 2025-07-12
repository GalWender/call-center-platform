import { useUpdateCall } from '../../hooks/call.hooks';
import { useSuggestedTasks } from '../../hooks/suggested-task.hooks';
import type { Call } from '../../types/call';
import { TaskStatus } from '../../types/task';
import IconButton from '../ui/IconButton';
import Panel from '../ui/Panel';
import TagPill from '../ui/TagPill';

interface Props {
  call: Call;
}

const SuggestedTasksPanel = ({ call }: Props) => {
  const { data: suggested = [], isLoading } = useSuggestedTasks(call.tagIds ?? []);
  const updateCall = useUpdateCall();

  const assignTask = (title: string) => {
    const newTasks = [...(call.tasks || []), { title, status: TaskStatus.OPEN }];
    updateCall.mutate({ id: call._id!, data: { tasks: newTasks } });
  };

  if (isLoading) return <Panel title="Suggested tasks">Loading…</Panel>;

  const assigned = new Set((call.tasks || []).map(t => t.title.trim().toLowerCase()));

  return (
    <Panel title="Suggested tasks" className="suggested-tasks-panel">
      <ul className="suggested-task-list">
        {suggested.map(t => {
          const isAssigned = assigned.has(t.title.trim().toLowerCase());
          return (
            <li key={t._id} className="suggested-task-item">
              <span>{t.title}</span>
              {isAssigned ? (
                <TagPill className="status-pill">Assigned</TagPill>
              ) : (
                <IconButton icon="add" label="Assign" onClick={() => assignTask(t.title)} />
              )}
            </li>
          );
        })}
        {suggested.length === 0 && <p>No suggestions for current tags.</p>}
      </ul>
    </Panel>
  );
};

export default SuggestedTasksPanel;
