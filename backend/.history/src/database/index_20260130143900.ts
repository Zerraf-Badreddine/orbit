import {drizzle} from 'drizzle-orm/postgres-js';
import *; // we need schema

export const db = drizzle(process.env.DB_URL);
