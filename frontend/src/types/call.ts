import type { Task } from './task.js';

export interface Call {
  _id?: string;
  subject: string;
  tagIds: string[];
  tasks: Task[];
  createdAt?: string;
  updatedAt?: string;
}

export type NewCall = Omit<Call, '_id' | 'createdAt' | 'updatedAt'>;
