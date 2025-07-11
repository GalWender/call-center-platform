import type { Tag } from './tag.model.js';
import type { Task } from './task.model.js';

export interface Call {
  _id?: string;
  subject: string;
  tagIds: Tag['_id'][];
  tasks: Task[];
  createdAt?: string;
  updatedAt?: string;
}

export type NewCall = Omit<Call, '_id' | 'createdAt' | 'updatedAt'>;
