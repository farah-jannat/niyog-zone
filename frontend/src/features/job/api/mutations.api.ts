import { job__axios } from "@/axios.service";
import { InsertJobType } from "@/features/job/schemas/create-job.schema";
import { Job } from "@/features/job/schemas/job.schema";
import { UpdateJobType } from "@/features/job/schemas/update-job.schema";

export const createJob = async (data: InsertJobType) => {
  const response = await job__axios.post<Job>(`/`, data);
  return response.data;
};


export const updateJob = async (data:UpdateJobType)=>{
  console.log("data for updting job from job mutations api - ", data)
  const response = await job__axios.put<Job>(`/`, data)
  return response.data;
}

