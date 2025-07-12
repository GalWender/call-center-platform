export interface Tag {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type NewTag = Omit<Tag, '_id' | 'createdAt' | 'updatedAt'>;
