import type { NewTask, Task } from '../types/task';
import { httpService } from './http.service';

const BASE = 'task/';

export const taskService = {
  query(): Promise<Task[]> {
    return httpService.get<Task[]>(BASE);
  },
  getById(id: string): Promise<Task> {
    return httpService.get<Task>(`${BASE}${id}`);
  },
  add(data: NewTask): Promise<Task> {
    return httpService.post<Task, NewTask>(BASE, data);
  },
  update(id: string, data: Partial<NewTask>): Promise<Task> {
    return httpService.put<Task, Partial<NewTask>>(`${BASE}${id}`, data);
  },
  remove(id: string): Promise<void> {
    return httpService.delete<void>(`${BASE}${id}`);
  },
};

export default taskService;
