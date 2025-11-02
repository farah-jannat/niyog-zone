import { z } from "zod";

export const insertCompanySchema = z.object({
  // Required fields
  userId: z.string().uuid({ message: "Invalid user ID format." }),
  name: z.string().min(1, { message: "Company name is required." }),
  category: z.string().min(1, { message: "Category is required." }),

  // Optional fields
  description: z.string().optional(),
  website: z
    .string()
    .url({ message: "Invalid URL format." })
    .max(255)
    .optional()
    .or(z.literal("")),
  location: z.string().max(255).optional().or(z.literal("")),
  logo: z
    .string()
    .url({ message: "Invalid URL format for logo." })
    .optional()
    .or(z.literal("")),
});

// TypeScript type derived from the Zod schema for insertion
export type InsertCompanyType = z.infer<typeof insertCompanySchema>;
