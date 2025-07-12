import { useState } from 'react';

import CallDetailsPage from '../cmps/user/CallDetailsPage';
import CallSidebar from '../cmps/user/CallSidebar';
import EmptyCallPrompt from '../cmps/user/EmptyCallPrompt';

export const UserPage = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  return (
    <div className="user-page">
      <CallSidebar selectedId={selectedId} onSelect={setSelectedId} />
      <main className="call-outlet">
        {selectedId ? <CallDetailsPage callId={selectedId} /> : <EmptyCallPrompt />}
      </main>
    </div>
  );
};

export default UserPage;
