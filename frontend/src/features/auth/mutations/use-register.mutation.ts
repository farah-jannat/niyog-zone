"use client";

import { register } from "@/features/auth/api/mutations.api";
import { RegisterSchemaType } from "@/features/auth/schemas/register.schema";
import { useAuthStore } from "@/store/use-auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  // ** --- props ---
  const router = useRouter();

  // ** --- Store ---
  const { setAuthUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterSchemaType) => register(data),

    onSuccess: (data) => {
      setAuthUser(data.user);
      toast.success("Register successfully");
      router.push("/");
    },
  });
};
