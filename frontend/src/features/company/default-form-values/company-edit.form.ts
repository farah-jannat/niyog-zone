import { Company } from "@/features/company/schemas/company.schema";
import { EditCompanyType } from "@/features/company/schemas/edit-company.schema";

export const editCompanyForm = (company: Company): EditCompanyType => {
  const defaultCompanyForm: EditCompanyType = {
    // Required Fields
    userId: company?.userId ?? "",
    id: company?.id ?? "",
    name: company?.name ?? "",
    category: company?.category ?? "",

    // Optional Fields (Defaulting to empty string for form inputs where applicable)
    description: company?.description ?? "",
    website: company?.website ?? "",
    location: company?.location ?? "",
    logo: company?.logo ?? "",
  };

  return defaultCompanyForm;
};
