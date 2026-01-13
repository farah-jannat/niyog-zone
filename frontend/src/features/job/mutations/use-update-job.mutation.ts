import { updateJob } from "@/features/job/api/mutations.api";
import { UpdateJobType } from "@/features/job/schemas/update-job.schema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export interface ApiValidationError {
  errors: { message: string; field?: string }[];
}
interface Props {
  setError: UseFormSetError<UpdateJobType>;
  reset: UseFormReset<UpdateJobType>;
}

const useUpdateJobMutation = (props: Props) => {
  const { reset, setError } = props;

  return useMutation({
    mutationFn: (data: UpdateJobType) => updateJob(data),
    onSuccess() {
      toast.success("job Updated succesfullly");
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

export default useUpdateJobMutation;
