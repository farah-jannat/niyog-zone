import { createJob } from "@/features/job/api/mutations.api";
import { InsertJobType } from "@/features/job/schemas/create-job.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface ApiValidationError {
  errors: { message: string; field?: string }[];
}

interface Props {
  setError: UseFormSetError<InsertJobType>;
  reset: UseFormReset<InsertJobType>;
}

const useCreateJobMutation = (props: Props) => {
  // ** Props
  const { reset, setError } = props;

  return useMutation({
    mutationFn: (data: InsertJobType) => createJob(data),

    onSuccess: () => {
      toast.success("Job created successfully");
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

export default useCreateJobMutation;
