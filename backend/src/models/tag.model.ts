import { ObjectId } from 'mongodb';

export interface Tag {
  _id?: ObjectId;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TagDto {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type NewTag = Omit<Tag, '_id' | 'createdAt' | 'updatedAt'>;
