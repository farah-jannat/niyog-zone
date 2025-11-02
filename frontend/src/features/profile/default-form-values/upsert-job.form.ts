import { UpsertProfileType } from "@/features/profile/schemas/upsert-profile.schema";

/**
 * Generates a default form object for creating or updating a user profile.
 * @param userId The ID of the user whose profile is being managed (required for the schema).
 * @returns A partial UpsertProfileType object with default values for form initialization.
 */
export const upsertProfileForm = (
  userId?: string
): Partial<UpsertProfileType> => {
  const defaultProfileForm: Partial<UpsertProfileType> = {
    // Required Fields
    userId: userId ?? "",
    bio: "", // Default to empty string
    profilePhoto: "", // Default to empty string for the URL input

    // Optional Fields
    id: undefined, // 'id' is optional and should generally be undefined for a 'create' operation, or filled for an 'update'.
    skills: [{ name: "", years: "" }], // Default to an empty array for the list of skills
  };

  return defaultProfileForm;
};
