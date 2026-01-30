import { pgTable, text, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const clientStatusEnum = pgEnum("client_status", ["active", "inactive"]);
export const client = pgTable("client", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  name: text("name").notNull(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  status: clientStatusEnum("status").notNull(),
  currency: text("currency").notNull(),
  color: text("color").notNull(),
});
