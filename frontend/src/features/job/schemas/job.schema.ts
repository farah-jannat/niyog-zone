import { z } from "zod";

export const JobSchema = z.object({
  id: z
    .string()
    .uuid()
    .describe("Unique identifier for the job, auto-generated UUID."),
  title: z.string().max(255).min(1).describe("Job title."),
  category: z.string().min(1).describe("job category."),
  description: z.string().min(1).describe("Detailed job description."),
  requirements: z
    .array(z.string())
    .nullable()
    .describe("List of job requirements."),
  salary: z.number().int().positive().describe("Job salary (integer)."),
  experience: z
    .string()
    .min(1)
    .describe("Required experience level (integer)."),
  location: z.string().min(1).describe("Job location."),
  jobType: z
    .string()
    .min(1)
    .describe("Type of job (e.g., full-time, part-time)."),

  jobLevel: z
    .string()
    .min(1)
    .describe("Level of job (e.g., full-time, part-time)."),

  vacancy: z
    .number()
    .int()
    .min(0)
    .describe("Vacancy or slot count for the job (integer)."),
  companyId: z
    .number()
    .int()
    .positive()
    .describe("ID of the company offering the job (Foreign Key)."),
  createdBy: z
    .number()
    .int()
    .positive()
    .describe("ID of the user who created the job posting (Foreign Key)."),
  createdAt: z
    .date()
    .describe("Timestamp of when the job was created, auto-generated."),
  updatedAt: z
    .date()
    .describe("Timestamp of when the job was last updated, auto-generated."),
});

export type Job = z.infer<typeof JobSchema>;
