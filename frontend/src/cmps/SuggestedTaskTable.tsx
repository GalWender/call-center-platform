import { useState } from 'react';

import {
  useAddSuggestedTask,
  useDeleteSuggestedTask,
  useSuggestedTasks,
} from '../hooks/suggested-task.hooks';
import { useTags } from '../hooks/tag.hooks';
import type { NewSuggestedTask } from '../types/suggestedTask';

export const SuggestedTaskTable = () => {
  const { data: tasks = [], isLoading } = useSuggestedTasks();

  const addTaskMutation = useAddSuggestedTask();

  const deleteTaskMutation = useDeleteSuggestedTask();

  const [newTitle, setNewTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get tags for selection
  const { data: tags = [] } = useTags();

  const onCreate = () => {
    if (!newTitle.trim()) return;
    addTaskMutation.mutate({ title: newTitle.trim(), tagIds: selectedTags } as NewSuggestedTask);
    setNewTitle('');
    setSelectedTags([]);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  if (isLoading) return <p>Loading…</p>;

  return (
    <>
      <div className="task-table">
        <div className="task-table-create">
          <label>Name</label>
          <input
            type="text"
            placeholder="Task title…"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />

          <div>
            <label>Tags</label>
            <div className="task-table-tags">
              {tags.map(tag => (
                <button
                  key={tag._id}
                  className={`tag-pill ${selectedTags.includes(tag._id || '') ? 'selected' : ''}`}
                  onClick={() => tag._id && toggleTag(tag._id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          <button onClick={onCreate} title="Add task">
            <span className="material-symbols-rounded">add</span>
            <span>Add</span>
          </button>
        </div>

        <ul className="task-table-list">
          {tasks.map(t => (
            <li key={t._id} className="task-table-row">
              <div className="task-content">
                <span className="task-title">{t.title}</span>
                <div className="task-tags">
                  {tags
                    .filter(tag => tag._id && t.tagIds?.includes(tag._id))
                    .map(tag => (
                      <span key={tag._id} className="tag-pill">
                        {tag.name}
                      </span>
                    ))}
                </div>
              </div>
              <div className="task-table-actions">
                <button onClick={() => deleteTaskMutation.mutate(t._id)} title="Delete">
                  <span className="material-symbols-rounded">delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SuggestedTaskTable;
