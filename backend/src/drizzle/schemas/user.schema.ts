import {
  pgTable,
  serial,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profileTable } from "@/drizzle/schemas/profile.schema";
import { jobTable } from "@/drizzle/schemas/job.schema";
import { applicationTable } from "@/drizzle/schemas/application.schema";
import { companyTable } from "@/drizzle/schemas/company.schema";

export const userRoleEnum = pgEnum("user_role", ["student", "recruiter"]);

// User Table (User.ts equivalent)
export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(), // Changed to varchar for phone numbers
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull(), // Using the defined enum
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(userTable, ({ one, many }) => ({
  profile: one(profileTable, {
    fields: [userTable.id],
    references: [profileTable.userId],
  }),
  createdJobs: many(jobTable),
  applications: many(applicationTable),
  companies: many(companyTable),
}));
