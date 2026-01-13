import { editCompany } from "@/features/company/api/mutations.api";
import { EditCompanyType } from "@/features/company/schemas/edit-company.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface ApiValidationError {
  errors: { message: string; field?: string }[];
}
interface Props {
  setError: UseFormSetError<EditCompanyType>;
  reset: UseFormReset<EditCompanyType>;
}
const useEditCompanyMutation = (props: Props) => {
  const { reset, setError } = props;
  return useMutation({
    mutationFn: (data: EditCompanyType) => editCompany(data),
    onSuccess: () => {
      toast.success("Updated company succesfully!");
    },

    onError: (error: AxiosError) => {
      const { errors } = error.response?.data as ApiValidationError;
      errors.forEach((err) =>
        setError(err.field as "root", { message: err.message })
      );
    },
  });
};

export default useEditCompanyMutation;
