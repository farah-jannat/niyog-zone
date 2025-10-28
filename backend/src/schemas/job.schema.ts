import { applicationTable } from "@/schemas/application.schema";
import { companyTable } from "@/schemas/company.schema";
import { userTable } from "@/schemas/user.schema";
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

interface Skill {
  name: string;
  years: string;
}

// Job Table (Job.ts equivalent)
export const jobTable = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  category: text("category").notNull().default("Software"),
  description: text("description").notNull(),
  requirements: text("requirements").array(),
  salary: integer("salary").notNull(),
  experience: text("experience").notNull(),
  location: text("location").notNull(),
  jobType: text("job_type").notNull(),
  jobLevel: text("job_level").notNull(),
  vacancy: integer("vacancy").notNull(),
  // techs: jsonb("skills").$type<Skill[]>(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companyTable.id, { onDelete: "cascade" }), // Foreign Key
  createdBy: uuid("created_by")
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
