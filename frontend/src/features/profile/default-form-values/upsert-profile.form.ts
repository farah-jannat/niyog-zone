import { Profile } from "@/features/profile/schemas/profile.schema";
import { UpsertProfileType } from "@/features/profile/schemas/upsert-profile.schema";

export const upsertProfileForm = (
  userId?: string,
  profile?: Profile
): Partial<UpsertProfileType> => {
  const defaultProfileForm: Partial<UpsertProfileType> = {
    // Required Fields
    userId: userId ?? "",
    bio: profile?.bio ?? "",
    profilePhoto:profile?.profilePhoto ?? "",
    skills: profile?.skills?? [{ name: "", years: "" }],
  };

  return defaultProfileForm;
};
