import { profile__axios } from "@/axios.service";
import {
  LoginApi,
  LoginSchemaType,
} from "@/features/auth/schemas/login.schema";

// ** --- Mutations ---
export const upsertProfile = async (data: LoginSchemaType) => {
  const response = await profile__axios.post<LoginApi>(`/:id`, data);
  return response.data;
};
