// ** Third party imports
import { z } from "zod";

const userRoleSchema = z.enum(["student", "recruiter"], {
  error: "Role must be either 'student' or 'recruiter'",
});

// ** Find or Create Conversation Validation
export const registerSchema = z
  .object({
    email: z.string().min(1, "Email is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(6, "Confirm Password is required."),
    fullName: z.string().min(1, "fullname is required"),
    //   role: userRoleSchema.default("student"),
    role: userRoleSchema,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"], // This ensures the error message appears under confirmPassword
      });
    }
  });
export type RegisterSchemaType = z.infer<typeof registerSchema>;
