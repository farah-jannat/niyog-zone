import { application__axios } from "@/axios.service";
import { InsertApplicationType } from "@/features/application/schemas/create-application.schema";

// ** --- Mutations ---
export const createApplication = async (data: InsertApplicationType) => {
  const response = await application__axios.post(`/`, data);
  return response.data;
};
