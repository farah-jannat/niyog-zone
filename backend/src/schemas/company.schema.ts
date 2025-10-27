import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { userTable } from "@/schemas/user.schema";
import { relations } from "drizzle-orm";
import { jobTable } from "@/schemas/job.schema";

export const companyTable = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  name: text("name").notNull().unique(),
  category: text("category").notNull(),
  description: text("description"),
  website: varchar("website", { length: 255 }),
  location: varchar("location", { length: 255 }),
  logo: text("logo"),
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
