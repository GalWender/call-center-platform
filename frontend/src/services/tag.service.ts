import type { NewTag, Tag } from '../types/tag';
import { httpService } from './http.service';

const BASE = 'tag/';

export const tagService = {
  query(): Promise<Tag[]> {
    return httpService.get<Tag[]>(BASE);
  },
  getById(id: string): Promise<Tag> {
    return httpService.get<Tag>(`${BASE}${id}`);
  },
  add(data: NewTag): Promise<Tag> {
    return httpService.post<Tag, NewTag>(BASE, data);
  },
  update(id: string, data: Partial<NewTag>): Promise<Tag> {
    return httpService.put<Tag, Partial<NewTag>>(`${BASE}${id}`, data);
  },
  remove(id: string): Promise<void> {
    return httpService.delete<void>(`${BASE}${id}`);
  },
};

export default tagService;
