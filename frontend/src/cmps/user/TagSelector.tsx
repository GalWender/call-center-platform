import { useEffect, useState } from 'react';
import { useUpdateCall } from '../../hooks/call.hooks';
import { useTags } from '../../hooks/tag.hooks';
import type { Call } from '../../types/call';
import TagPill from '../ui/TagPill';

interface Props {
  call: Call;
}

const TagSelector = ({ call }: Props) => {
  const { data: tags = [] } = useTags();
  const updateCall = useUpdateCall();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(call.tagIds || []));

  useEffect(() => {
    setSelectedIds(new Set(call.tagIds || []));
  }, [call.tagIds]);

  const toggle = (tagId: string) => {
    const nextIdsArray: string[] = selectedIds.has(tagId)
      ? Array.from(selectedIds).filter(id => id !== tagId)
      : [...Array.from(selectedIds), tagId];

    setSelectedIds(new Set(nextIdsArray));

    updateCall.mutate({ id: call._id!, data: { tagIds: nextIdsArray } });
  };

  return (
    <div className="tag-selector">
      <h3>Select tags</h3>
      <div className="tag-selector-list">
        {tags.map(tag =>
          tag._id ? (
            <TagPill
              key={tag._id}
              as="button"
              selected={selectedIds.has(tag._id)}
              onClick={() => toggle(tag._id!)}
            >
              {tag.name}
            </TagPill>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TagSelector;
