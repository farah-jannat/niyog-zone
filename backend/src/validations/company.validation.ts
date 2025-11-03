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

// many thing to learn from the below schema

// import { z } from "zod";

// // Base Schema for data that can be inserted or updated.
// // It excludes the auto-generated fields (id, createdAt, updatedAt)
// // but keeps all nullable/optional fields as optional strings.
// export const baseCompanySchema = z.object({
//   // UUID for the user who owns this company record (required for insert)
//   userId: z.string().uuid("Must be a valid user ID (UUID format)"),

//   // Company Name (required for insert)
//   name: z.string().min(1, "Company name cannot be empty"),

//   // Industry or business category (required for insert)
//   category: z.string().min(1, "Category cannot be empty"),

//   // Optional fields
//   description: z.string().optional(),

//   // Website URL (optional, max 255 chars as per varchar)
//   website: z.string()
//     .url("Must be a valid URL format")
//     .max(255, "Website URL must be 255 characters or less")
//     .optional()
//     .or(z.literal('')), // Allow empty string for optional field

//   // Location/Address (optional, max 255 chars as per varchar)
//   location: z.string()
//     .max(255, "Location must be 255 characters or less")
//     .optional()
//     .or(z.literal('')), // Allow empty string for optional field

//   // Logo URL (optional)
//   logo: z.string()
//     .url("Must be a valid URL format for the logo image")
//     .optional()
//     .or(z.literal('')), // Allow empty string for optional field
// });

// /**
//  * Schema specifically for inserting a new company record.
//  * All fields marked .notNull() in Drizzle are required here.
//  */
// export const insertCompanySchema = baseCompanySchema.required({
//   userId: true,
//   name: true,
//   category: true,
// });

// export type InsertCompany = z.infer<typeof insertCompanySchema>;

// /**
//  * Schema for updating an existing company record.
//  * All fields are optional because you might only update one field.
//  */
// export const updateCompanySchema = baseCompanySchema.partial();

// export type UpdateCompany = z.infer<typeof updateCompanySchema>;

// /**
//  * Schema for validating the full shape of a Company object returned from the database.
//  */
// export const selectCompanySchema = insertCompanySchema.extend({
//   id: z.string().uuid(),
//   createdAt: z.date(), // Drizzle converts timestamp() to Date object
//   updatedAt: z.date(),
// });

// export type SelectCompany = z.infer<typeof selectCompanySchema>;
