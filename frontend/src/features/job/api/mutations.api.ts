import { job__axios } from "@/axios.service";
import { InsertJobType } from "@/features/job/schemas/create-job.schema";
import { Job } from "@/features/job/schemas/job.schema";

export const createJob = async (data: InsertJobType) => {
  const response = await job__axios.post<Job>(`/`, data);
  return response.data;
};
