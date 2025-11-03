import { UpsertProfileType } from "@/features/profile/schemas/upsert-profile.schema";

export const upsertProfileForm = (
  userId?: string
): Partial<UpsertProfileType> => {
  const defaultProfileForm: Partial<UpsertProfileType> = {
    // Required Fields
    userId: userId ?? "",
    bio: "",
    profilePhoto: "",
    skills: [{ name: "", years: "" }],
  };

  return defaultProfileForm;
};
