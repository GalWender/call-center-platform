import { Collection, ObjectId } from 'mongodb';

import {
  NewSuggestedTask,
  SuggestedTask,
  SuggestedTaskDto,
} from '../../models/suggested-task.model.js';
import { getCollection } from '../../services/db.service.js';
import { logger } from '../../services/logger.service.js';
import { mapId } from '../../utils/dto.util.js';

const COLLECTION = 'suggested_task';

export interface SuggestedTaskFilter {
  tagIds?: string[];
}

export function buildCriteria(filter: SuggestedTaskFilter = {}): Record<string, unknown> {
  const criteria: Record<string, unknown> = {};
  if (filter.tagIds && filter.tagIds.length) {
    criteria.tagIds = { $in: filter.tagIds };
  }
  return criteria;
}

const toDto = (doc: SuggestedTask): SuggestedTaskDto => mapId<SuggestedTask, SuggestedTaskDto>(doc);

export async function query(filter: SuggestedTaskFilter = {}): Promise<SuggestedTaskDto[]> {
  try {
    const col: Collection<SuggestedTask> = await getCollection<SuggestedTask>(COLLECTION);
    const criteria = buildCriteria(filter);
    const docs = await col.find(criteria).toArray();
    return docs.map(toDto);
  } catch (err) {
    logger.error('Failed to query suggested tasks', err);
    throw err;
  }
}

export async function getById(id: string): Promise<SuggestedTaskDto | null> {
  try {
    const col = await getCollection<SuggestedTask>(COLLECTION);
    const _id = new ObjectId(id);
    const doc = await col.findOne({ _id });
    return doc ? toDto(doc) : null;
  } catch (err) {
    logger.error(`Failed to get suggested task ${id}`, err);
    throw err;
  }
}

export async function add(data: NewSuggestedTask): Promise<SuggestedTaskDto> {
  try {
    const col = await getCollection<SuggestedTask>(COLLECTION);
    const now = new Date().toISOString();
    const doc: SuggestedTask = { ...data, createdAt: now, updatedAt: now };
    const { insertedId } = await col.insertOne(doc);
    return { ...doc, _id: insertedId.toHexString() };
  } catch (err) {
    logger.error('Failed to add suggested task', err);
    throw err;
  }
}

export async function update(
  id: string,
  data: Partial<NewSuggestedTask>
): Promise<SuggestedTaskDto | null> {
  try {
    const col = await getCollection<SuggestedTask>(COLLECTION);
    const _id = new ObjectId(id);
    const updateDoc = { ...data, updatedAt: new Date().toISOString() };
    const result = await col.findOneAndUpdate(
      { _id },
      { $set: updateDoc },
      { returnDocument: 'after' }
    );
    return result.value ? toDto(result.value) : null;
  } catch (err) {
    logger.error('Failed to update suggested task', err);
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const col = await getCollection<SuggestedTask>(COLLECTION);
    const _id = new ObjectId(id);
    await col.deleteOne({ _id });
  } catch (err) {
    logger.error('Failed to remove suggested task', err);
    throw err;
  }
}
