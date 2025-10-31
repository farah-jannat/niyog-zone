import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

import { getJob } from "@/features/job/api/queries.api";

export const useJobQuery = (id: string) => {
  return useQueryWithSideEffects({
    queryKey: ["job", id],
    queryFn: () => getJob(id),
    refetchOnWindowFocus: false,
  });
};
