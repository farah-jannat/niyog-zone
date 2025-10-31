import { company__axios } from "@/axios.service";
import { Company } from "@/features/company/schemas/company.schema";

export const getCompany = async (id: string, q?: string) => {
  const response = await company__axios.get<Company>(`/${id}?${q}`);
  return response.data;
};
