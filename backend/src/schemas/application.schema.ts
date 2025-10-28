import { pgTable, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";
import { jobTable } from "@/schemas/job.schema";
import { userTable } from "@/schemas/user.schema";
import { relations } from "drizzle-orm";

export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "accepted",
  "rejected",
]);

// Application Table (Application.ts equivalent)
export const applicationTable = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  jobId: uuid("job_id")
    .notNull()
    .references(() => jobTable.id, { onDelete: "cascade" }),
  applicantId: uuid("applicant_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  status: applicationStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations for Application
export const applicationsRelations = relations(applicationTable, ({ one }) => ({
  job: one(jobTable, {
    fields: [applicationTable.jobId],
    references: [jobTable.id],
  }),
  applicant: one(userTable, {
    fields: [applicationTable.applicantId],
    references: [userTable.id],
  }),
}));
