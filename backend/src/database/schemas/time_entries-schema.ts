import {
  pgTable,
  text,
  integer,
  date,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { project } from "./project-schema";

export const timeEntry = pgTable("time_entry", {
  id: text("id").notNull().primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }),
  durationSeconds: integer("duration_seconds").notNull(),
  billable: boolean("billable").notNull().default(true),
  date: date("date").notNull(),
});
