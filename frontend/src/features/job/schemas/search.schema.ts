import { z } from "zod";

export const JobSearchSchema = z.object({
  category: z
    .string()
    .min(1, "Category cannot be empty if provided.")
    .optional()
    .describe("Category filter for the job."),

  // Maps to 'Job Type' dropdown, from jobType in JobSchema
  jobType: z
    .string()
    .min(1, "Job Type cannot be empty if provided.")
    .optional()
    .describe("Filter by job type (e.g., full-time, part-time)."),

  // Maps to 'Job Level' dropdown, from jobLevel in JobSchema
  jobLevel: z
    .string()
    .min(1, "Job Level cannot be empty if provided.")
    .optional()
    .describe("Filter by job level (e.g., entry, senior)."),

  experience: z
    .string()
    .min(1, "Experience cannot be empty if provided.")
    .optional()
    .describe("Filter by required experience level."),

  salary: z
    .string()
    .min(1, "Salary cannot be empty if provided.")
    .optional()
    .describe("Filter by a salary range or specific value."),

  //   salary: z
  //     .number()
  //     .min(1, "Salary cannot be empty if provided.")
  //     .optional()
  //     .describe("Filter by a salary range or specific value."),

  //   salary: z
  //     .preprocess(
  //       (val) => (typeof val === "string" ? parseInt(val, 10) : val),
  //       z.number()
  //     ),

  //   salary: z
  //     .preprocess((val) => {
  //       if (val === "" || val === null || val === undefined) return undefined;

  //       const parsed = typeof val === "string" ? parseInt(val, 10) : val;

  //       return isNaN(parsed as number) ? val : parsed;
  //     }, z.number().min(1, "Salary must be a positive number."))
  //     .optional()
  //     .describe("Filter by a salary range or specific value."),

  // salary: z.coerce.number().int().positive("Price must be a positive integer"),
  //   salary: z.coerce
  //     .number()
  //     .int()
  //     .positive("Price must be a positive integer"),
  // .optional(),

  keywords: z
    .string()
    .min(1, "Title search must have at least one character.")
    .optional()
    .describe("Search term for job title."),
});

// Infer the TypeScript type from the schema for use in your application
export type JobSearchFormValues = z.infer<typeof JobSearchSchema>;
