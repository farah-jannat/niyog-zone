ALTER TABLE "jobs" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "category" SET DEFAULT 'Software';--> statement-breakpoint
DROP TYPE "public"."job_category";