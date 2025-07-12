import type { Call, NewCall } from '../types/call';
import { httpService } from './http.service';

const BASE = 'call/';

export const callService = {
  query(): Promise<Call[]> {
    return httpService.get<Call[]>(BASE);
  },
  getById(id: string): Promise<Call> {
    return httpService.get<Call>(`${BASE}${id}`);
  },
  add(data: NewCall): Promise<Call> {
    return httpService.post<Call, NewCall>(BASE, data);
  },
  update(id: string, data: Partial<NewCall>): Promise<Call> {
    return httpService.put<Call, Partial<NewCall>>(`${BASE}${id}`, data);
  },
  remove(id: string): Promise<void> {
    return httpService.delete<void>(`${BASE}${id}`);
  },
};

export default callService;
