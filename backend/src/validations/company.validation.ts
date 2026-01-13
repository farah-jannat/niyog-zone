import { z } from "zod";

export const baseCompanySchema = z.object({
  userId: z.string().uuid("Must be a valid user ID (UUID format)"),

  name: z.string().min(1, "Company name cannot be empty"),

  category: z.string().min(1, "Category cannot be empty"),

  description: z.string().optional(),

  website: z
    .string()
    .url("Must be a valid URL format")
    .max(255, "Website URL must be 255 characters or less")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .max(255, "Location must be 255 characters or less")
    .optional()
    .or(z.literal("")),

  logo: z
    .string()
    .url("Must be a valid URL format for the logo image")
    .optional()
    .or(z.literal("")),
});

export const insertCompanySchema = baseCompanySchema.required({
  userId: true,
  name: true,
  category: true,
});

export type InsertCompanyType = z.infer<typeof insertCompanySchema>;

export const updateCompanySchema = baseCompanySchema.partial();

export type UpdateCompanyType = z.infer<typeof updateCompanySchema>;

export const selectCompanySchema = insertCompanySchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SelectCompany = z.infer<typeof selectCompanySchema>;




export const editCompanySchema = z.object({
  // Required fields
  userId: z.string().uuid({ message: "Invalid user ID format." }),

  id: z
    .string()
    .uuid()
    .describe("Unique identifier for the job, auto-generated UUID."),
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

export type EditCompanyInput = z.infer<typeof editCompanySchema>;
