import { pgTable, pgEnum, text, date, decimal } from "drizzle-orm/pg-core";
import { client } from "./client-schema";
import { project } from "./project-schema";

export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft",
  "sent",
  "paid",
  "overdue",
]);

export const invoice = pgTable("invoice", {
  id: text("id").notNull().primaryKey(),
  clientId: text("client_id")
    .notNull()
    .references(() => client.id, { onDelete: "cascade" }),
  projectId: text("project_id")
    .notNull()
    .references(() => project.id),
  invoiceNumber: text("invoice_number").notNull(),
  amount: decimal("amount").notNull(),
  status: invoiceStatusEnum("status").notNull(),
  issueDate: date("issue_date").notNull(),
  dueDate: date("due_date").notNull(),
  pdfUrl: text("pdf_url"),
});
