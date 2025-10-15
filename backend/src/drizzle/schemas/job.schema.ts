import { applicationTable } from "@/drizzle/schemas/application.schema";
import { companyTable } from "@/drizzle/schemas/company.schema";
import { userTable } from "@/drizzle/schemas/user.schema";
import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

// Job Table (Job.ts equivalent)
export const jobTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  // requirements: [ { type: String } ] -> Can be stored as an array of strings in PostgreSQL (JSONB/text array)
  requirements: text("requirements").array(),
  salary: integer("salary").notNull(),
  experienceLevel: integer("experience_level").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  jobType: varchar("job_type", { length: 50 }).notNull(),
  position: integer("position").notNull(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companyTable.id, { onDelete: "cascade" }), // Foreign Key
  createdBy: integer("created_by")
    .notNull()
    .references(() => userTable.id, { onDelete: "restrict" }), // Foreign Key
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Define relations for Job
export const jobsRelations = relations(jobTable, ({ one, many }) => ({
  company: one(companyTable, {
    fields: [jobTable.companyId],
    references: [companyTable.id],
  }),
  creator: one(userTable, {
    fields: [jobTable.createdBy],
    references: [userTable.id],
  }),
  applications: many(applicationTable),
}));