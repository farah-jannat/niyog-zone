import { createApplication } from "@/features/application/api/mutations.api";
import { InsertApplicationType } from "@/features/application/schemas/create-application.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateApplicationMutation = () => {
  return useMutation({
    mutationFn: (data: InsertApplicationType) => createApplication(data),

    onSuccess: () => {
      toast.success("Applied successfully");
    },
  });
};
