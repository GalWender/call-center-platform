import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { taskService } from '../services/task.service';
import type { NewTask, Task } from '../types/task';

const KEY = ['tasks'];

export const useTasks = () => useQuery<Task[]>({ queryKey: KEY, queryFn: taskService.query });

export const useTask = (id: string) =>
  useQuery<Task>({
    queryKey: [...KEY, id],
    queryFn: () => taskService.getById(id),
    enabled: Boolean(id),
  });

export const useAddTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: NewTask) => taskService.add(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NewTask> }) =>
      taskService.update(id, data),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: [...KEY, id] });
    },
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};
