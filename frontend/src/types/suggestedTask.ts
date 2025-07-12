export interface SuggestedTask {
  _id: string;
  title: string;
  tagIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type NewSuggestedTask = Omit<SuggestedTask, 'createdAt' | 'updatedAt' | '_id'>;
