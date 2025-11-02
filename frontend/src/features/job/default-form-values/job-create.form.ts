import { InsertJobType } from "@/features/job/schemas/create-job.schema";

export const createJobForm = (
  creatorId?: string,
  companyId?: string
): Partial<InsertJobType> => {
  const defaultJobForm: Partial<InsertJobType> = {
    companyId: companyId ?? "",
    createdBy: creatorId ?? "",

    // Required Fields with empty defaults for form input
    title: "",
    description: "",
    salary: 0, // Use 0 or null if your form handles initial number state differently
    experience: "",
    location: "",
    jobType: "",
    jobLevel: "",
    vacancy: 1, // Defaulting to 1 as it must be a positive integer

    // Optional/Defaulted Fields
    category: "Software", // Matches the default value in the Zod schema
    requirements: [], // Empty array for initial state

    // techs: [], // Uncomment if you add a 'techs' field to InsertJobType
  };

  return defaultJobForm;
};
