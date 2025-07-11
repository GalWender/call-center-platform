import { Collection, Db, Document, MongoClient } from 'mongodb';

import { logger } from '../services/logger.service.js';

const DB_NAME = process.env.DB_NAME;

let dbConn: Db | null = null;

export async function getCollection<TSchema extends Document = Document>(
  collectionName: string
): Promise<Collection<TSchema>> {
  try {
    const db = await connect();
    return db.collection<TSchema>(collectionName);
  } catch (err: unknown) {
    logger.error('Failed to get Mongo collection', err);
    throw err;
  }
}

async function connect(): Promise<Db> {
  if (dbConn) return dbConn;
  try {
    const uri = process.env.DB_URL;
    if (!uri) throw new Error('DB_URL environment variable is not defined');
    if (!DB_NAME) throw new Error('DB_NAME environment variable is not defined');

    const client = await MongoClient.connect(uri);
    dbConn = client.db(DB_NAME);
    logger.info(`Connected to MongoDB - DB: ${DB_NAME}`);
    return dbConn;
  } catch (err: unknown) {
    logger.error('Cannot connect to DB', err);
    throw err;
  }
}
