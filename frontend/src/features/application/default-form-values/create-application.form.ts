import { InsertApplicationType } from "@/features/application/schemas/create-application.schema";

export const createApplicationForm = (
  applicantId?: string,
  jobId?: string
): Partial<InsertApplicationType> => {
  const defaultApplicationForm: Partial<InsertApplicationType> = {
    applicantId: applicantId ?? "",
    jobId: jobId ?? "",
  };

  return defaultApplicationForm;
};
