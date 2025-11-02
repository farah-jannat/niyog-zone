// import { auth__axios } from "@/axios.service";
import { auth__axios } from "@/axios.service";
import { User } from "@/features/user/schemas/user.schema";

// ** --- Queries ---
export async function getAuthUser(): Promise<User> {
  const response = await auth__axios.get<User>(`/auth-user`);
  return response.data;
}
