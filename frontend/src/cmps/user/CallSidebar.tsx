import IconButton from '../ui/IconButton';
import { useCalls } from '../../hooks/call.hooks';
import { useModal } from '../../context/ModalContext';
import CallForm from './CallForm';

interface Props {
  selectedId?: string;
  onSelect: (id?: string) => void;
}

const CallSidebar = ({ selectedId, onSelect }: Props) => {
  const { data: calls = [], isLoading } = useCalls();
  const { openModal } = useModal();

  const openAddModal = () => openModal(<CallForm />);

  return (
    <aside className="call-sidebar">
      <div className="header">
        <h3>Calls</h3>
        <IconButton icon="add" label="Add call" onClick={openAddModal} />
      </div>

      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <ul className="call-list">
          {calls
            .slice()
            .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
            .map(c => (
              <li
                key={c._id}
                className={`call-item${c._id === selectedId ? ' active' : ''}`}
                onClick={() => onSelect(c._id)}
              >
                <span>{c.subject}</span>
              </li>
            ))}
        </ul>
      )}
    </aside>
  );
};

export default CallSidebar;
