import { user__axios } from "@/axios.service";
import { User } from "@/features/user/schemas/user.schema";

export const getUser = async (id: string, q: string) => {
  const response = await user__axios.get<User>(`/${id}?${q}`);

  return response.data;
};
