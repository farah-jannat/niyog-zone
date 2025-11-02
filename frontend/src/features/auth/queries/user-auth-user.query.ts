"use client";

import { getAuthUser } from "@/features/auth/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";
import { useAuthStore } from "@/store/use-auth.store";

export const useAuthUser = () => {
  // ** --- store ---
  const { setAuthUser } = useAuthStore();

  return useQueryWithSideEffects({
    queryKey: ["auth_user"],
    queryFn: () => getAuthUser(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,

    onSuccess: (data) => {
      setAuthUser(data);
    },
  });
};
