import { upsertProfile } from "@/features/profile/api/mutations.api";
import { UpsertProfileType } from "@/features/profile/schemas/upsert-profile.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface ApiValidationError {
  errors: { message: string; field?: string }[];
}

interface Props {
  setError: UseFormSetError<UpsertProfileType>;
  reset: UseFormReset<UpsertProfileType>;
}

const useUpsertProfileMutation = (props: Props) => {
  // ** Props
  const { reset, setError } = props;

  return useMutation({
    mutationFn: (data: UpsertProfileType) => upsertProfile(data),

    onSuccess: () => {
      toast.success("Profile updated successfully");
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

export default useUpsertProfileMutation;
