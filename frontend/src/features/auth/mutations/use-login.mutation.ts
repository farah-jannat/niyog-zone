"use client";

import { login } from "@/features/auth/api/mutations.api";
import { LoginSchemaType } from "@/features/auth/schemas/login.schema";
import { useAuthStore } from "@/store/use-auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  // ** --- props ---
  const router = useRouter();

  // ** --- Store ---
  const { setAuthUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginSchemaType) => login(data),

    onSuccess: (data) => {
      setAuthUser(data.user);
      toast.success("Login successfully");
      router.push("/");
    },
  });
};
