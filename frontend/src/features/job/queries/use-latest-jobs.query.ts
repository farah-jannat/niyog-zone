import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

import { getLatestJobs } from "@/features/job/api/queries.api";

export const useLatestJobsQuery = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQueryWithSideEffects({
    queryKey: ["latest-jobs", page, limit],
    queryFn: () => getLatestJobs(page, limit),
    refetchOnWindowFocus: false,
  });
};
