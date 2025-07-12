import { useState } from 'react';
import SuggestedTaskPanel from '../cmps/admin/SuggestedTaskPanel';
import TagPanel from '../cmps/admin/TagPanel';
import useMediaQuery from '../hooks/useMediaQuery';

export const AdminPage = () => {
  const isMobile = useMediaQuery('(max-width: 1268px)');
  const [activeTab, setActiveTab] = useState<'tags' | 'suggested'>('tags');

  return (
    <div className="admin-page">
      {isMobile && (
        <div className="admin-tabs">
          <button
            className={activeTab === 'tags' ? 'active' : ''}
            onClick={() => setActiveTab('tags')}
          >
            Tags
          </button>
          <button
            className={activeTab === 'suggested' ? 'active' : ''}
            onClick={() => setActiveTab('suggested')}
          >
            Suggested tasks
          </button>
        </div>
      )}

      {(!isMobile || activeTab === 'tags') && <TagPanel />}
      {(!isMobile || activeTab === 'suggested') && <SuggestedTaskPanel />}
    </div>
  );
};

export default AdminPage;
