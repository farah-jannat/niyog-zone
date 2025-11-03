import { profile__axios } from "@/axios.service";
import { Profile } from "@/features/profile/schemas/profile.schema";
import { UpsertProfileType } from "@/features/profile/schemas/upsert-profile.schema";

// ** --- Mutations ---
export const upsertProfile = async (data: UpsertProfileType) => {
  const response = await profile__axios.post<Profile>(`/`, data);
  return response.data;
};
