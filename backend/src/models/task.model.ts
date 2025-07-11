export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

import { ObjectId } from 'mongodb';

export interface Task {
  _id?: ObjectId;
  title: string;
  status: TaskStatus;
  tagIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskDto {
  _id: string;
  title: string;
  status: TaskStatus;
  tagIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type NewTask = Omit<Task, '_id' | 'createdAt' | 'updatedAt'>;
