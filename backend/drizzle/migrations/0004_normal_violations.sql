ALTER TABLE "jobs" ADD COLUMN "experience" text NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "job_level" text NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "vacancy" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "experience_level";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "position";