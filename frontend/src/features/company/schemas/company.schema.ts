import { z } from "zod";

export const companyCreateSchema = z.object({
  userId: z
    .string()
    .uuid("Invalid User ID format")
    .min(1, "User ID is required"),

  name: z.string().min(1, "Company name is required"),

  category: z.string().min(1, "Category is required"),

  description: z.string().optional(),

  website: z.string().url("Invalid website URL").optional().or(z.literal("")),

  location: z
    .string()
    .max(255, "Location cannot exceed 255 characters")
    .optional(),

  logo: z.string().url("Invalid logo URL").optional().or(z.literal("")),
});

// --- Zod Schema for Full Company Database Record ---
export const companySchema = companyCreateSchema.extend({
  // id: uuid("id").primaryKey().defaultRandom(),
  id: z.string().uuid(),

  // createdAt: timestamp("created_at").defaultNow().notNull(),
  createdAt: z.date(),

  // updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedAt: z.date(),
});

// --- Zod Schema for Updating a Company (All Fields Optional) ---
export const companyUpdateSchema = companyCreateSchema.partial();

// --- Zod Types ---
export type Company = z.infer<typeof companySchema>;
export type CompanyCreate = z.infer<typeof companyCreateSchema>;
export type CompanyUpdate = z.infer<typeof companyUpdateSchema>;
