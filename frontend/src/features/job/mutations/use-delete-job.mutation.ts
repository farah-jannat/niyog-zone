import { deleteJob } from "@/features/job/api/mutations.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      toast.success("job deleted succesfully!");
      queryClient.invalidateQueries({
        queryKey: ["recruiter-jobs"],
      });
    },
  });
};
export default useDeleteJobMutation;
