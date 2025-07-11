import { Collection, ObjectId } from 'mongodb';

import { NewTask, Task, TaskDto } from '../../models/task.model.js';
import { getCollection } from '../../services/db.service.js';
import { logger } from '../../services/logger.service.js';
import { mapId } from '../../utils/dto.util.js';

const COLLECTION = 'task';

const toDto = (doc: Task): TaskDto => mapId<Task, TaskDto>(doc);

export async function query(): Promise<TaskDto[]> {
  try {
    const col: Collection<Task> = await getCollection<Task>(COLLECTION);
    const docs = await col.find({}).toArray();
    return docs.map(toDto);
  } catch (err) {
    logger.error('Failed to query tasks', err);
    throw err;
  }
}

export async function getById(id: string): Promise<TaskDto | null> {
  try {
    const col = await getCollection<Task>(COLLECTION);
    const _id = new ObjectId(id);
    const doc = await col.findOne({ _id });
    return doc ? toDto(doc) : null;
  } catch (err) {
    logger.error(`Failed to get task ${id}`, err);
    throw err;
  }
}

export async function add(data: NewTask): Promise<TaskDto> {
  try {
    const col = await getCollection<Task>(COLLECTION);
    const now = new Date().toISOString();
    const doc: Task = { ...data, createdAt: now, updatedAt: now };
    const { insertedId } = await col.insertOne(doc as Task);
    return { ...doc, _id: insertedId.toHexString() };
  } catch (err) {
    logger.error('Failed to add task', err);
    throw err;
  }
}

export async function update(id: string, data: Partial<NewTask>): Promise<TaskDto | null> {
  try {
    const col = await getCollection<Task>(COLLECTION);
    const _id = new ObjectId(id);
    const updateDoc = { ...data, updatedAt: new Date().toISOString() };
    const result = await col.findOneAndUpdate(
      { _id },
      { $set: updateDoc },
      { returnDocument: 'after' }
    );
    return result.value ? toDto(result.value) : null;
  } catch (err) {
    logger.error('Failed to update task', err);
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const col = await getCollection<Task>(COLLECTION);
    const _id = new ObjectId(id);
    await col.deleteOne({ _id });
  } catch (err) {
    logger.error('Failed to remove task', err);
    throw err;
  }
}
