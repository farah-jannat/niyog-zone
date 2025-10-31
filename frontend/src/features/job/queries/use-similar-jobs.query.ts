import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

import { getSimilarJobs } from "@/features/job/api/queries.api";

interface Props {
  category: string | undefined;
  q: string;
  page: number;
  limit: number;
}

export const useSimilarJobsQuery = (props: Props) => {
  const { category, q, page, limit } = props;

  return useQueryWithSideEffects({
    queryKey: ["similar-jobs", category, q, page, limit],
    queryFn: () => getSimilarJobs(category!, q, page, limit),
    refetchOnWindowFocus: false,
    enabled: !!category,
  });
};
