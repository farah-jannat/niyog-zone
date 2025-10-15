import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { userTable } from "@/drizzle/schemas/user.schema";
import { relations } from "drizzle-orm";
import { jobTable } from "@/drizzle/schemas/job.schema";

export const companyTable = pgTable("companies", {
  id: serial("id").primaryKey(), // Primary Key, replaces Mongoose's _id
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  website: varchar("website", { length: 255 }),
  location: varchar("location", { length: 255 }),
  logo: varchar("logo", { length: 255 }), // URL to company logo
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }), // Foreign Key
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations for Company
export const companiesRelations = relations(companyTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [companyTable.userId],
    references: [userTable.id],
  }),
  jobs: many(jobTable),
}));
