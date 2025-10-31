import { getCompany } from "@/features/company/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

export const useCompanyQuery = (id: string, q?: string) => {
  return useQueryWithSideEffects({
    queryKey: ["company", id, q],
    queryFn: () => getCompany(id, q),
    refetchOnWindowFocus: false,
  });
};
