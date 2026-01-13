import { Job } from "@/features/job/schemas/job.schema";
import {
  updateJobSchema,
  UpdateJobType,
} from "@/features/job/schemas/update-job.schema";

// export const updateJobForm = (job?:UpdateJobType): UpdateJobType => {
export const updateJobForm = (job?:Job): UpdateJobType => {
  console.log("job form update");

  const defaultJobForm: UpdateJobType = {

    id: job?.id,
    companyId: job?.companyId ?? "",
    title: job?.title ?? "",
    description: job?.description ?? "",
    salary: job?.salary ?? 0, // Use 0 or null if your form handles initial number state differently
    experience: job?.experience ?? "",
    location: job?.location ?? "",
    jobType: job?.jobType ?? "",
    jobLevel: job?.jobLevel ?? "",
    vacancy: job?.vacancy ?? 1, // Defaulting to 1 as it must be a positive integer

    // Optional/Defaulted Fields
    category: job?.category ?? "Software", // Matches the default value in the Zod schema
    requirements: job?.requirements?? [{ title: "" }], // Empty array for initial state

    // requirements: job?.requirements ? job?.requirements : [{ title: "" }], // Empty array for initial state

    // requirements: [{ title: "" }], // Empty array for initial state
  };

  return defaultJobForm;
};
