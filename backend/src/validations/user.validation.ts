// ** Third party imports
import { z } from "zod";

// ** Find or Create Conversation Validation
export const registerSchema = z.object({
  email: z.string().min(1, "email is required"),
  phoneNumber: z.string().min(1, "phone number is required"),
  password: z.string().min(1, "password is required"),
  fullName: z.string().min(1, "fullname is required"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "email is required"),
  password: z.string().min(1, "password is required"),
  role: z.string().min(1, "role is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;
