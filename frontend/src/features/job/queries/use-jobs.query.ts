import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

import { getJobs } from "@/features/job/api/queries.api";

interface Props {
  q: string;
  page: number;
  limit: number;
}

export const useJobsQuery = (props: Props) => {
  const { q, page, limit } = props;

  return useQueryWithSideEffects({
    queryKey: ["jobs", q, page, limit],
    queryFn: () => getJobs(q, page, limit),
    refetchOnWindowFocus: false,
  });
};
