import { AsyncLocalStorage } from 'async_hooks';
import { User } from '../models/user.model.js';

// Defines the shape of the data stored in AsyncLocalStorage for each request.
export interface AlsStore {
  loggedinUser?: User;
}

// Create a new, typed AsyncLocalStorage instance.
const asyncLocalStorage = new AsyncLocalStorage<AlsStore>();

export default asyncLocalStorage;
