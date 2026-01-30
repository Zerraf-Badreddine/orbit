import {drizzle} from 'drizzle-orm/postgres-js';
import *; // we need schema

const db = drizzle(process.env.DB_URL);
