// ** Third party imports
import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  years: z.string().min(1, "Years is required"),
});

// ** Find or Create Conversation Validation
export const profileUpdateSchema = z.object({
  email: z.string().min(1, "email is required"),
  phoneNumber: z.string().min(1, "phone number is required"),
  password: z.string().min(1, "password is required"),
  fullName: z.string().min(1, "fullname is required"),
  skills: z.array(skillSchema).default([]),
});
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
