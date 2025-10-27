import { job__axios } from "@/axios.service";
import { Job } from "@/features/job/schemas/job.schema";

export interface JobsResponse {
  data: Job[];
  totalCount: number;
}

export const getJobs = async (q: string, page: number, limit: number) => {
  const response = await job__axios.get<JobsResponse>(
    `/search?${q}&page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getLatestJobs = async (page: number, limit: number) => {
  const response = await job__axios.get<JobsResponse>(
    `/search?page=${page}&limit=${limit}`
  );
  return response.data;
};
