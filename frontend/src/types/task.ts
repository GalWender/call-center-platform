export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface Task {
  _id?: string;
  title: string;
  status: TaskStatus;
  tagIds?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type NewTask = Omit<Task, '_id' | 'createdAt' | 'updatedAt'>;
