import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profileSkillTable } from "@/schemas/profile-skill.schema";

export const skillTable = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  years: text("years").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations for Skills (many-to-many part)
export const skillsRelations = relations(skillTable, ({ many }) => ({
  profileSkills: many(profileSkillTable),
}));
