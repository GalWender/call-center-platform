import { useModal } from '../../context/ModalContext';
import { useCall } from '../../hooks/call.hooks';
import { useTags } from '../../hooks/tag.hooks';
import IconButton from '../ui/IconButton';
import TagPill from '../ui/TagPill';
import CallTasksPanel from './CallTasksPanel';
import SuggestedTasksPanel from './SuggestedTasksPanel';
import TagSelector from './TagSelector';

interface Props {
  callId: string;
}

const CallDetailsPage = ({ callId }: Props) => {
  const { data: call, isLoading } = useCall(callId);
  const { data: tags = [] } = useTags();
  const { openModal } = useModal();

  if (isLoading || !call) return <p>Loading…</p>;

  const callTags = tags.filter(t => t._id && call.tagIds?.includes(t._id));

  const openTagSelector = () => {
    openModal(<TagSelector call={call} />);
  };

  return (
    <div className="call-details-page">
      <h2>{call.subject}</h2>

      <div className="call-tags-row">
        <span>Tags:</span>
        {callTags.map(tag => (
          <TagPill key={tag._id}>{tag.name}</TagPill>
        ))}
        <IconButton icon="add" label="Add tag" onClick={openTagSelector} />
      </div>

      <div className="task-panels">
        <CallTasksPanel callId={callId} tasks={call.tasks || []} />
        <SuggestedTasksPanel call={call} />
      </div>
    </div>
  );
};

export default CallDetailsPage;
