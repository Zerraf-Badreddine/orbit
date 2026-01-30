import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas/auth-schema";

const client = postgres(process.env.DATABASE_URL || process.env.DB_URL!);
export const db = drizzle(client, { schema });
