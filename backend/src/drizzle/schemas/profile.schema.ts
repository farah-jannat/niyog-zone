import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp, // Removed uniqueIndex since it's not used in the new structure
} from "drizzle-orm/pg-core";
import { userTable } from "@/drizzle/schemas/user.schema";
import { relations } from "drizzle-orm";
import { profileSkillTable } from "@/drizzle/schemas/profile-skill.schema";

export const profileTable = pgTable("profiles", {
  userId: integer("user_id")
    .primaryKey() // This makes it NOT NULL and UNIQUE, implicitly solving the index
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  bio: text("bio"),
  resume: varchar("resume", { length: 255 }),
  resumeOriginalName: varchar("resume_original_name", { length: 255 }),
  profilePhoto: varchar("profile_photo", { length: 255 }).default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations for Profile
export const profilesRelations = relations(profileTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [profileTable.userId],
    references: [userTable.id],
  }),
  profileSkills: many(profileSkillTable),
}));
