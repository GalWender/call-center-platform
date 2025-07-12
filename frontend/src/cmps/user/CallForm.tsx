import { FormEvent, useState } from 'react';

import { useAddCall } from '../../hooks/call.hooks';
import type { NewCall } from '../../types/call';
import { useModal } from '../../context/ModalContext';
import IconButton from '../ui/IconButton';

const CallForm = () => {
  const [subject, setSubject] = useState('');
  const addCallMutation = useAddCall();
  const { closeModal } = useModal();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    addCallMutation.mutate({ subject: subject.trim() } as NewCall, {
      onSuccess: () => {
        closeModal();
        setSubject('');
      },
    });
  };

  return (
    <form className="call-form" onSubmit={onSubmit}>
      <h3>New Call</h3>
      <input
        type="text"
        placeholder="Subject…"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />
      <div className="actions">
        <IconButton type="submit" icon="save" label="Save">
          <span>Save</span>
        </IconButton>
      </div>
    </form>
  );
};

export default CallForm;
