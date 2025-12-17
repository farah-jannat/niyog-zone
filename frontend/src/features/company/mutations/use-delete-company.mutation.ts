import { deleteCompany } from "@/features/company/api/mutations.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface Props {
  recruiterId?: string;
}
const useDeleteCompanyMutation = (props: Props) => {
  const { recruiterId } = props;

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: () => {
      toast.success("Company is deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["recruiter-companies", recruiterId],
      });
    },
  });
};

export default useDeleteCompanyMutation;
