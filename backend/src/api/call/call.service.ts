import { Collection, ObjectId } from 'mongodb';

import { Call, CallDto, NewCall } from '../../models/call.model.js';
import { Task, TaskDto } from '../../models/task.model.js';
import { getCollection } from '../../services/db.service.js';
import { logger } from '../../services/logger.service.js';
import { mapId } from '../../utils/dto.util.js';

const COLLECTION = 'call';

const mapTask = (task: Task): TaskDto => mapId<Task, TaskDto>(task);

function toDto(call: Call): CallDto {
  return {
    _id: call._id?.toHexString() ?? '',
    subject: call.subject,
    tagIds: call.tagIds.map(id => id.toHexString()),
    tasks: call.tasks.map(mapTask),
    createdAt: call.createdAt,
    updatedAt: call.updatedAt,
  };
}

export async function query(): Promise<CallDto[]> {
  try {
    const col: Collection<Call> = await getCollection<Call>(COLLECTION);
    const docs = await col.find({}).sort({ updatedAt: -1 }).toArray();
    return docs.map(toDto);
  } catch (err) {
    logger.error('Failed to query calls', err);
    throw err;
  }
}

export async function getById(id: string): Promise<CallDto | null> {
  try {
    const col = await getCollection<Call>(COLLECTION);
    const _id = new ObjectId(id);
    const doc = await col.findOne({ _id });
    return doc ? toDto(doc) : null;
  } catch (err) {
    logger.error(`Failed to get call ${id}`, err);
    throw err;
  }
}

export async function add(data: NewCall): Promise<CallDto> {
  try {
    const col = await getCollection<Call>(COLLECTION);
    const now = new Date().toISOString();

    const tagObjectIds = (data.tagIds ?? []).map(id => new ObjectId(id));

    const tasks: Task[] = (data.tasks ?? []).map(t => ({
      ...t,
      _id: new ObjectId(),
      createdAt: now,
      updatedAt: now,
    })) as Task[];

    const doc: Call = {
      subject: data.subject.trim(),
      tagIds: tagObjectIds,
      tasks,
      createdAt: now,
      updatedAt: now,
    } as Call;

    const { insertedId } = await col.insertOne(doc);
    return toDto({ ...doc, _id: insertedId });
  } catch (err) {
    logger.error('Failed to add call', err);
    throw err;
  }
}

export async function update(id: string, data: Partial<NewCall>): Promise<CallDto | null> {
  try {
    const col = await getCollection<Call>(COLLECTION);
    const _id = new ObjectId(id);

    const updateDoc: Partial<Call> = {};
    if (data.subject !== undefined) updateDoc.subject = data.subject.trim();
    if (data.tagIds !== undefined) updateDoc.tagIds = data.tagIds.map(tid => new ObjectId(tid));
    if (data.tasks !== undefined) {
      updateDoc.tasks = data.tasks.map(t => ({
        ...t,
        _id: (t as unknown as Task)._id
          ? new ObjectId((t as unknown as Task)._id as unknown as string)
          : new ObjectId(),
      })) as Task[];
    }
    updateDoc.updatedAt = new Date().toISOString();

    const result = await col.findOneAndUpdate(
      { _id },
      { $set: updateDoc },
      { returnDocument: 'after' }
    );
    return result.value ? toDto(result.value) : null;
  } catch (err) {
    logger.error('Failed to update call', err);
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const col = await getCollection<Call>(COLLECTION);
    const _id = new ObjectId(id);
    await col.deleteOne({ _id });
  } catch (err) {
    logger.error('Failed to remove call', err);
    throw err;
  }
}
