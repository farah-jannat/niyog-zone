import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid, // Removed uniqueIndex since it's not used in the new structure
} from "drizzle-orm/pg-core";
import { userTable } from "@/drizzle/schemas/user.schema";
import { relations } from "drizzle-orm";
import { profileSkillTable } from "@/drizzle/schemas/profile-skill.schema";

export const profileTable = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: integer("user_id")
    .primaryKey()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  bio: text("bio").notNull(),
  profilePhoto: text("profile_photo").notNull(),
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
