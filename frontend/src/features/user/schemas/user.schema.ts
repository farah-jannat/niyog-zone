import { z } from "zod";

// Zod equivalent of the Drizzle Enum
export const userRoleEnum = z.enum(["student", "recruiter"]);

// Zod Schema for **creating** a new user (for input/signup)
export const userCreateSchema = z.object({
  id: z.string(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  fullName: z.string().min(1, "Full name is required"),
  role: userRoleEnum.default("student").optional(), // Can be omitted on signup, uses default
});

// Zod Schema for the **full database record**
export const userSchema = userCreateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Zod Type derived from the full schema
export type User = z.infer<typeof userSchema>;

// Zod Type for creation/input
export type UserCreate = z.infer<typeof userCreateSchema>;
