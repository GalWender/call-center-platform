import { useState } from 'react';
import { useAddTag, useDeleteTag, useTags, useUpdateTag } from '../../hooks/tag.hooks';
import type { Tag } from '../../types/tag';

export const TagTable = () => {
  const { data: tags = [], isLoading } = useTags();

  const addTagMutation = useAddTag();
  const updateTagMutation = useUpdateTag();
  const deleteTagMutation = useDeleteTag();

  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState<{ [id: string]: string }>({});

  const onCreate = () => {
    if (!newName.trim()) return;
    addTagMutation.mutate({ name: newName.trim() });
    setNewName('');
  };

  const startEdit = (tag: Tag) => tag._id && setEditing({ ...editing, [tag._id]: tag.name });

  const onEditChange = (id: string, val: string) => setEditing(prev => ({ ...prev, [id]: val }));

  const saveEdit = (id: string) => {
    const name = editing[id]?.trim();
    if (!name) return cancelEdit(id);
    updateTagMutation.mutate({ id, data: { name } });
    cancelEdit(id);
  };

  const cancelEdit = (id: string) => {
    setEditing(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  if (isLoading) return <p>Loading tags…</p>;

  return (
    <>
      <div className="tag-table">
        <div className="tag-table-create">
          <input
            type="text"
            placeholder="New tag name…"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <button onClick={onCreate} title="Add tag">
            <span className="material-symbols-rounded">add</span>
            <span>Add</span>
          </button>
        </div>

        <ul className="tag-table-list">
          {tags.map(tag => {
            if (!tag._id) return null;
            const isEditing = tag._id in editing;
            return (
              <li key={tag._id} className="tag-table-row">
                {isEditing ? (
                  <input
                    className="tag-table-edit-input"
                    value={editing[tag._id]}
                    onChange={e => onEditChange(tag._id, e.target.value)}
                  />
                ) : (
                  <span>{tag.name}</span>
                )}

                <div className="tag-table-actions">
                  {isEditing ? (
                    <button onClick={() => saveEdit(tag._id)} title="Save">
                      <span className="material-symbols-rounded">save</span>
                    </button>
                  ) : (
                    <button onClick={() => startEdit(tag)} title="Edit">
                      <span className="material-symbols-rounded">edit</span>
                    </button>
                  )}
                  <button onClick={() => deleteTagMutation.mutate(tag._id)} title="Delete">
                    <span className="material-symbols-rounded">delete</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TagTable;
