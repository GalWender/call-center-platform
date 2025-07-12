import { Collection, ObjectId } from 'mongodb';

import { NewTag, Tag, TagDto } from '../../models/tag.model.js';
import { getCollection } from '../../services/db.service.js';
import { logger } from '../../services/logger.service.js';
import { mapId } from '../../utils/dto.util.js';

const TAG_COLLECTION = 'tag';

const toDto = (tag: Tag): TagDto => mapId<Tag, TagDto>(tag);

export async function query(): Promise<TagDto[]> {
  try {
    const collection: Collection<Tag> = await getCollection<Tag>(TAG_COLLECTION);
    const docs = await collection.find({}).toArray();
    return docs.map(toDto);
  } catch (err) {
    logger.error('Failed to query tags', err);
    throw err;
  }
}

export async function getById(id: string): Promise<TagDto | null> {
  try {
    const collection = await getCollection<Tag>(TAG_COLLECTION);
    const _id = new ObjectId(id);
    const doc = await collection.findOne({ _id });
    return doc ? toDto(doc) : null;
  } catch (err) {
    logger.error(`Failed to get tag ${id}`, err);
    throw err;
  }
}

export async function add(tag: NewTag): Promise<TagDto> {
  try {
    const collection = await getCollection<Tag>(TAG_COLLECTION);
    const now = new Date().toISOString();
    const doc: Tag = { ...tag, createdAt: now, updatedAt: now };
    const { insertedId } = await collection.insertOne(doc);
    return { ...doc, _id: insertedId.toHexString() };
  } catch (err) {
    logger.error('Failed to add tag', err);
    throw err;
  }
}

export async function update(id: string, data: Partial<NewTag>): Promise<TagDto | null> {
  try {
    const collection = await getCollection<Tag>(TAG_COLLECTION);
    const _id = new ObjectId(id);
    const updateDoc = { ...data, updatedAt: new Date().toISOString() };
    const result = await collection.findOneAndUpdate(
      { _id },
      { $set: updateDoc },
      { returnDocument: 'after' }
    );
    return result.value ? toDto(result.value) : null;
  } catch (err) {
    logger.error('Failed to update tag', err);
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const collection = await getCollection<Tag>(TAG_COLLECTION);
    const _id = new ObjectId(id);
    await collection.deleteOne({ _id });
  } catch (err) {
    logger.error('Failed to remove tag', err);
    throw err;
  }
}
