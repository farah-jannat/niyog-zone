import { company__axios } from "@/axios.service";
import { Company } from "@/features/company/schemas/company.schema";
import { InsertCompanyType } from "@/features/company/schemas/create-company.schema";
import { EditCompanyType } from "@/features/company/schemas/edit-company.schema";

export const createCompany = async (data: InsertCompanyType) => {
  const response = await company__axios.post<Company>(`/`, data);
  return response.data;
};

export const deleteCompany = async(id:string)=>{
  const response = await company__axios.delete<Company>(`/${id}`)
  return response.data
}


export const editCompany = async(data:EditCompanyType)=>{
  console.log("data for updating company", data)
  const response = await company__axios.put<Company>(`/`, data)
  return response.data
}
