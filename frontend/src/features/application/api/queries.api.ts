import { application__axios } from "@/axios.service";
import { Job } from "@/features/job/schemas/job.schema";

export interface JobsResponse {
  jobs: Job[];
  totalCount: number;
}

export const checkApplication = async (applicantId: string, jobId: string) => {
  const response = await application__axios.get<boolean>(
    `/${applicantId}/${jobId}`
  );
  return response.data;
};
