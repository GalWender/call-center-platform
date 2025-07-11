import type { NewTask, Task } from './task';

export interface Call {
  _id?: string;
  subject: string;
  tagIds: string[];
  tasks: Task[];
  createdAt?: string;
  updatedAt?: string;
}

export interface NewCall {
  subject: string;
  tagIds?: string[];
  tasks?: NewTask[];
}
