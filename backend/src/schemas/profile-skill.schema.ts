import { pgTable, integer, uuid, timestamp } from "drizzle-orm/pg-core";
import { profileTable } from "@/schemas/profile.schema";
import { skillTable } from "@/schemas/skill.schema";
import { relations } from "drizzle-orm";

export const profileSkillTable = pgTable(
  "profile_skills",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profileTable.userId, { onDelete: "cascade" }),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => skillTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
  // (t) => ({
  //   pk: uniqueIndex("profile_skill_pk").on(t.profileId, t.skillId),
  // })
);

export const profileSkillsRelations = relations(
  profileSkillTable,
  ({ one }) => ({
    profile: one(profileTable, {
      fields: [profileSkillTable.profileId],
      references: [profileTable.userId],
    }),
    skill: one(skillTable, {
      fields: [profileSkillTable.skillId],
      references: [skillTable.id],
    }),
  })
);
