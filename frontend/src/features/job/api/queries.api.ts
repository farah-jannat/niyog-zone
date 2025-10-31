import { job__axios } from "@/axios.service";
import { Job } from "@/features/job/schemas/job.schema";

export interface JobsResponse {
  jobs: Job[];
  totalCount: number;
}

export const getJobs = async (q: string, page: number, limit: number) => {
  const response = await job__axios.get<JobsResponse>(
    `?${q}&page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getJob = async (id: string) => {
  const response = await job__axios.get<Job>(`/${id}`);
  return response.data;
};

export const getLatestJobs = async (page: number, limit: number) => {
  const response = await job__axios.get<JobsResponse>(
    `/latest?page=${page}&limit=${limit}`
  );

  return response.data;
};

export const getSimilarJobs = async (
  category: string,
  q: string,
  page: number,
  limit: number
) => {
  const response = await job__axios.get<JobsResponse>(
    `/similar/${category}?${q}&page=${page}&limit=${limit}`
  );

  return response.data;
};

export const getRecruiterJobs = async (
  id: string,
  q: string,
  page: number,
  limit: number
) => {
  const response = await job__axios.get<JobsResponse>(
    `/recruiter/${id}?${q}&page=${page}&limit=${limit}`
  );

  // const response = await job__axios.get<JobsResponse>(
  //   q
  //     ? `/recruiter/${id}?${q}&page=${page}&limit=${limit}`
  //     : `/recruiter/${id}?page=${page}&limit=${limit}`
  // );
  return response.data;
};

export const getComapanyJobs = async (
  id: string,
  q: string,
  page: number,
  limit: number
) => {
  const response = await job__axios.get<JobsResponse>(
    `/company/${id}?${q}&page=${page}&limit=${limit}`
  );

  return response.data;
};
