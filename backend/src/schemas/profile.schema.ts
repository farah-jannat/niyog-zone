import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

import { userTable } from "@/schemas/user.schema";
import { relations } from "drizzle-orm";

interface Skill {
  name: string;
  years: string;
}

export const profileTable = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .unique()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),

  bio: text("bio").notNull(),
  profilePhoto: text("profile_photo").notNull(),
  skills: jsonb("skills").$type<Skill[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations for Profile
export const profilesRelations = relations(profileTable, ({ one }) => ({
  user: one(userTable, {
    fields: [profileTable.userId],
    references: [userTable.id],
  }),
}));
