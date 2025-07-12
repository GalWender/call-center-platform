import type { NewSuggestedTask, SuggestedTask } from '../types/suggestedTask';
import { httpService } from './http.service';

const BASE = 'suggested-task/';

export const suggestedTaskService = {
  query(): Promise<SuggestedTask[]> {
    return httpService.get<SuggestedTask[]>(BASE);
  },
  getById(id: string): Promise<SuggestedTask> {
    return httpService.get<SuggestedTask>(`${BASE}${id}`);
  },
  add(data: NewSuggestedTask): Promise<SuggestedTask> {
    return httpService.post<SuggestedTask, NewSuggestedTask>(BASE, data);
  },
  update(id: string, data: Partial<NewSuggestedTask>): Promise<SuggestedTask> {
    return httpService.put<SuggestedTask, Partial<NewSuggestedTask>>(`${BASE}${id}`, data);
  },
  remove(id: string): Promise<void> {
    return httpService.delete<void>(`${BASE}${id}`);
  },
};

export default suggestedTaskService;
