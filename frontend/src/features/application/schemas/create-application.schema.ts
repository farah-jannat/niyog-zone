import { JobSchema } from "@/features/job/schemas/job.schema";
import { userSchema } from "@/features/user/schemas/user.schema";
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

 export const applicationSchema = insertApplicationSchema.extend({  
  job:JobSchema.optional(),
  // applicant:userSchema.optional()
});


export type ApplicationType = z.infer<typeof applicationSchema>;

export type InsertApplicationType = z.infer<typeof insertApplicationSchema>;


