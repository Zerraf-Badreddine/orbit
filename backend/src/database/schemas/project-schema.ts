import {
  pgTable,
  pgEnum,
  text,
  integer,
  date,
  decimal,
} from "drizzle-orm/pg-core";
import { client } from "./client-schema";

export const projectStatusEnum = pgEnum("project_status", [
  "active",
  "paused",
  "completed",
  "archived",
]);

export const billingTypeEnum = pgEnum("billing_type", [
  "hourly",
  "fixed",
  "retainer",
]);

export const project = pgTable("project", {
  id: text("id").notNull().primaryKey(),
  clientId: text("client_id")
    .notNull()
    .references(() => client.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  status: projectStatusEnum("status").notNull(),
  billingType: billingTypeEnum("billing_type").notNull(),
  rate: decimal("rate").notNull(),
  currency: text("currency").notNull(),
  hoursEstimated: decimal("hours_estimated").notNull(),
  deadline: date("deadline").notNull(),
  color: text("color").notNull(),
});
