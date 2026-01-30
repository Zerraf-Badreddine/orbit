CREATE TYPE "public"."client_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('draft', 'sent', 'paid', 'overdue');--> statement-breakpoint
CREATE TYPE "public"."billing_type" AS ENUM('hourly', 'fixed', 'retainer');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('active', 'paused', 'completed', 'archived');--> statement-breakpoint
CREATE TABLE "client" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"company_name" text NOT NULL,
	"email" text NOT NULL,
	"status" "client_status" NOT NULL,
	"currency" text NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"project_id" text NOT NULL,
	"invoice_number" text NOT NULL,
	"amount" numeric NOT NULL,
	"status" "invoice_status" NOT NULL,
	"issue_date" date NOT NULL,
	"due_date" date NOT NULL,
	"pdf_url" text
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"name" text NOT NULL,
	"status" "project_status" NOT NULL,
	"billing_type" "billing_type" NOT NULL,
	"rate" numeric NOT NULL,
	"currency" text NOT NULL,
	"hours_estimated" numeric NOT NULL,
	"deadline" date NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "time_entry" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"description" text NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone,
	"duration_seconds" integer NOT NULL,
	"billable" boolean DEFAULT true NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "client" ADD CONSTRAINT "client_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;