import { Collection, Db, Document, MongoClient } from 'mongodb';

import { logger } from '../services/logger.service.js';

// ---------------------------------------------------------------------------
// MongoDB helper – strict typings & safe error handling (lint-clean)
// ---------------------------------------------------------------------------

const DB_NAME = 'wonderchat_db';

let dbConn: Db | null = null;

/**
 * Returns a MongoDB collection instance typed to the given schema.
 */
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

/**
 * Establish (or reuse) a connection to the database.
 */
async function connect(): Promise<Db> {
  if (dbConn) return dbConn;
  try {
    const uri = process.env.DB_URL ?? '';
    const client = await MongoClient.connect(uri);
    dbConn = client.db(DB_NAME);
    logger.info(`Connected to DB: ${DB_NAME}`);
    return dbConn;
  } catch (err: unknown) {
    logger.error('Cannot connect to DB', err);
    throw err;
  }
}
