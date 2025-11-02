import { InsertCompanyType } from "@/features/company/schemas/create-company.schema";

/**
 * Generates a default form object for creating a new company.
 * @param userId The ID of the user creating the company (required for the schema).
 * @returns A partial InsertCompanyType object with default values for form initialization.
 */
export const createCompanyForm = (
  userId?: string
): Partial<InsertCompanyType> => {
  const defaultCompanyForm: Partial<InsertCompanyType> = {
    // Required Fields
    userId: userId ?? "",
    name: "",
    category: "",

    // Optional Fields (Defaulting to empty string for form inputs where applicable)
    description: "",
    website: "",
    location: "",
    logo: "",
  };

  return defaultCompanyForm;
};
