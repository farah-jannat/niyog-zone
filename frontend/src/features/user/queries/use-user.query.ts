import { getUser } from "@/features/user/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export const useUserQuery = (id: string, q: string) => {
  return useQueryWithSideEffects({
    queryKey: ["user", id, q],
    queryFn: () => getUser(id, q),
    refetchOnWindowFocus: false,
  });
};
