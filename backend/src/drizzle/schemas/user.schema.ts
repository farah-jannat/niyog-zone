import { pgTable, timestamp, pgEnum, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profileTable } from "@/drizzle/schemas/profile.schema";
import { jobTable } from "@/drizzle/schemas/job.schema";
import { applicationTable } from "@/drizzle/schemas/application.schema";
import { companyTable } from "@/drizzle/schemas/company.schema";

export const userRoleEnum = pgEnum("user_role", ["student", "recruiter"]);

// User Table (User.ts equivalent)
export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").notNull(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: userRoleEnum("role").notNull().default("student"),
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
