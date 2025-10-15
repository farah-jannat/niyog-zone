import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { profileSkillTable } from "@/drizzle/schemas/profile-skill.schema";

export const skillTable = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

// Define relations for Skills (many-to-many part)
export const skillsRelations = relations(skillTable, ({ many }) => ({
  profileSkills: many(profileSkillTable),
}));
