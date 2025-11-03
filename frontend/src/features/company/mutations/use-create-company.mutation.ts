import { createCompany } from "@/features/company/api/mutations.api";
import { InsertCompanyType } from "@/features/company/schemas/create-company.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface ApiValidationError {
  errors: { message: string; field?: string }[];
}

interface Props {
  setError: UseFormSetError<InsertCompanyType>;
  reset: UseFormReset<InsertCompanyType>;
}

const useCreateCompanyMutation = (props: Props) => {
  // ** Props
  const { reset, setError } = props;

  return useMutation({
    mutationFn: (data: InsertCompanyType) => createCompany(data),

    onSuccess: () => {
      toast.success("Company created successfully");
      reset();
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
    },
  });
};

export default useCreateCompanyMutation;
