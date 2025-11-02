"use client";

import { logout } from "@/features/auth/api/mutations.api";
import { useAuthStore } from "@/store/use-auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  // ** --- props ---
  const router = useRouter();

  // ** --- Store ---
  const { setAuthUser } = useAuthStore();

  return useMutation({
    mutationFn: () => logout(),

    onSuccess: (data) => {
      setAuthUser(data.user);
      toast.success("Logout successfully");
      router.push("/");
    },
  });
};
