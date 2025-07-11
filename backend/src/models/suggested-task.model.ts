import { ObjectId } from 'mongodb';

export interface SuggestedTask {
  _id?: ObjectId;
  title: string;
  tagIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SuggestedTaskDto {
  _id: string;
  title: string;
  tagIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type NewSuggestedTask = Omit<SuggestedTask, '_id' | 'createdAt' | 'updatedAt'>;
