import { upsertProfile } from "@/features/profile/api/mutations.api";
import { UpsertProfileType } from "@/features/profile/schemas/upsert-profile.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface ApiValidationError {
  errors: { message: string; field?: string }[];
}

interface Props {
  id?: string;
  setError: UseFormSetError<UpsertProfileType>;
  reset: UseFormReset<UpsertProfileType>;
}

const useUpsertProfileMutation = (props: Props) => {
  const queryClient = useQueryClient();
  // ** Props
  const { reset, setError, id } = props;

  return useMutation({
    mutationFn: (data: UpsertProfileType) => upsertProfile(data, id),

    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile",data?.userId] });
      console.log("profile dta form mutation ", data)
      // reset();
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
