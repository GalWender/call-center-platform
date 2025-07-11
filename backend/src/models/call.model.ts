import { ObjectId } from 'mongodb';
import type { NewTask, Task, TaskDto } from './task.model.js';

export interface Call {
  _id?: ObjectId;
  subject: string;
  tagIds: ObjectId[];
  tasks: Task[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CallDto {
  _id: string;
  subject: string;
  tagIds: string[];
  tasks: TaskDto[];
  createdAt?: string;
  updatedAt?: string;
}

export interface NewCall {
  subject: string;
  tagIds?: string[];
  tasks?: NewTask[];
}
