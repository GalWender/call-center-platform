import { useModal } from '../../context/ModalContext';
import IconButton from '../ui/IconButton';
import CallForm from './CallForm';

const EmptyCallPrompt = () => {
  const { openModal } = useModal();
  return (
    <div className="empty-call-prompt">
      <IconButton
        icon="add"
        label="Create new call"
        className="big-create-btn"
        onClick={() => openModal(<CallForm />)}
      >
        <span>Create new call</span>
      </IconButton>
    </div>
  );
};

export default EmptyCallPrompt;
