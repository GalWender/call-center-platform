import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { callService } from '../services/call.service';
import type { NewCall } from '../types/call';

const KEY = ['calls'];

export const useCalls = () => useQuery({ queryKey: KEY, queryFn: callService.query });

export const useCall = (id: string) =>
  useQuery({
    queryKey: [...KEY, id],
    queryFn: () => callService.getById(id),
    enabled: Boolean(id),
  });

export const useAddCall = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: NewCall) => callService.add(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

export const useUpdateCall = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NewCall> }) =>
      callService.update(id, data),
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: KEY });
      qc.invalidateQueries({ queryKey: [...KEY, id] });
    },
  });
};

export const useDeleteCall = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => callService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};
