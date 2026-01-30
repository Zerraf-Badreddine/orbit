import { postgres } from 'bun';
import {drizzle} from 'drizzle-orm/postgres-js';

const pgClient = postgres()
export const db = drizzle({
    da
})