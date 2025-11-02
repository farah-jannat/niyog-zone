import { auth__axios } from "@/axios.service";
import {
  LoginApi,
  LoginSchemaType,
} from "@/features/auth/schemas/login.schema";
import { RegisterSchemaType } from "@/features/auth/schemas/register.schema";

// ** --- Mutations ---
export const login = async (data: LoginSchemaType) => {
  const response = await auth__axios.post<LoginApi>(`/login`, data);
  return response.data;
};

export const register = async (data: RegisterSchemaType) => {
  const response = await auth__axios.post<LoginApi>(`/register`, data);
  return response.data;
};

export const logout = async () => {
  const response = await auth__axios.post<LoginApi>(`/logout`);
  return response.data;
};
