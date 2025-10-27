import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

import { getJobs } from "@/features/job/api/queries.api";

export const useJobsQuery = ({
  q,
  page,
  limit,
}: {
  q: string;
  page: number;
  limit: number;
}) => {
  return useQueryWithSideEffects({
    queryKey: ["jobs", q, page, limit],
    queryFn: () => getJobs(q, page, limit),
    refetchOnWindowFocus: false,
  });
};
