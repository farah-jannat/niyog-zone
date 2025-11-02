import { z } from "zod";

// --- 1. Define the Zod schema for the nested 'Skill' interface ---
const SkillSchema = z.object({
  name: z.string().min(1, { message: "Skill name cannot be empty." }),
  years: z.string().min(1, { message: "Years of experience cannot be empty." }),
});

// --- 2. Define the Zod schema for inserting a Profile (Excluding DB defaults) ---
export const upsertProfileSchema = z.object({
  id: z.string().uuid({ message: "Invalid user ID format." }).optional(),
  userId: z.string().uuid({ message: "Invalid user ID format." }),
  bio: z
    .string()
    .min(1, { message: "Bio cannot be empty." })
    .max(500, { message: "Bio must be 500 characters or less." }),
  profilePhoto: z.string().url({ message: "Invalid profile photo URL." }),
  skills: z.array(SkillSchema).optional(),
});

// --- Optional: Infer the TypeScript type for convenience ---
export type UpsertProfileType = z.infer<typeof upsertProfileSchema>;
