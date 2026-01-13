import { z } from "zod";

const requirementSchema = z.object({
  title: z.string().min(1, { message: "Title can't be empty" }),
});


export const updateJobSchema = z.object({
  // Required Fields
  
  id: z
    .string()
    .uuid()
    .describe("Unique identifier for the job, auto-generated UUID."),
  title: z.string().min(1, { message: "Job title is required." }).max(255),
  description: z.string().min(1, { message: "Job description is required." }),
  salary: z.coerce
    .number()
    .int()
    .positive({ message: "Salary must be a positive integer." }),
  experience: z.string().min(1, { message: "Experience level is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  jobType: z.string().min(1, { message: "Job type is required." }),
  jobLevel: z.string().min(1, { message: "Job level is required." }),
  vacancy: z.coerce
    .number()
    .int()
    .positive({ message: "Vacancy must be a positive integer." }),

  category: z.string().default("Software").optional(),

  requirements: z.array(requirementSchema).optional(),

  // techs: z.array(z.object({ name: z.string(), years: z.string() })).optional(), // If you uncomment the techs column

  companyId: z.string().uuid({ message: "Invalid Company ID format." }),
//   createdBy: z.string().uuid({ message: "Invalid Creator ID format." }),

});

// Type extraction for convenience
export type UpdateJobType = z.infer<typeof updateJobSchema >;
