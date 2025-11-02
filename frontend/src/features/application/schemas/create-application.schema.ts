import { z } from "zod";

export const ApplicationStatusEnum = z.enum([
  "pending",
  "accepted",
  "rejected",
]);

export const insertApplicationSchema = z.object({
  jobId: z.string().uuid("Invalid jobId format. Must be a valid UUID."),
  applicantId: z
    .string()
    .uuid("Invalid applicantId format. Must be a valid UUID."),
});

export type InsertApplicationType = z.infer<typeof insertApplicationSchema>;
