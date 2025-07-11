import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { suggestedTaskService } from '../services/suggested-task.service';
import type { NewSuggestedTask, SuggestedTask } from '../types/suggestedTask';

const KEY = ['suggestedTasks'];

export const useSuggestedTasks = () =>
  useQuery<SuggestedTask[]>({ queryKey: KEY, queryFn: suggestedTaskService.query });

export const useSuggestedTask = (id: string) =>
  useQuery<SuggestedTask>({
    queryKey: [...KEY, id],
    queryFn: () => suggestedTaskService.getById(id),
    enabled: Boolean(id),
  });

export const useAddSuggestedTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: NewSuggestedTask) => suggestedTaskService.add(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

export const useUpdateSuggestedTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NewSuggestedTask> }) =>
      suggestedTaskService.update(id, data),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: [...KEY, id] });
    },
  });
};

export const useDeleteSuggestedTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => suggestedTaskService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};
