import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchema from "./schemas/auth-schema";
import * as clientSchema from "./schemas/client-schema";
import * as projectSchema from "./schemas/project-schema";
import * as timeEntrySchema from "./schemas/time_entries-schema";
import * as invoiceSchema from "./schemas/invoice-schema";
const schema = {
  ...authSchema,
  ...clientSchema,
  ...projectSchema,
  ...timeEntrySchema,
  ...invoiceSchema,
};

const client = postgres(process.env.DATABASE_URL || process.env.DB_URL!);
export const db = drizzle(client, { schema });
