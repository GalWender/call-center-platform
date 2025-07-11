import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { tagService } from '../services/tag.service';
import type { NewTag, Tag } from '../types/tag';

const KEY = ['tags'];

export const useTags = () => useQuery<Tag[]>({ queryKey: KEY, queryFn: tagService.query });

export const useTag = (id: string) =>
  useQuery<Tag>({
    queryKey: [...KEY, id],
    queryFn: () => tagService.getById(id),
    enabled: Boolean(id),
  });

export const useAddTag = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: NewTag) => tagService.add(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

export const useUpdateTag = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NewTag> }) =>
      tagService.update(id, data),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: [...KEY, id] });
    },
  });
};

export const useDeleteTag = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tagService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};
