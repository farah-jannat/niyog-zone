import { getComapanyJobs } from "@/features/job/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

interface Props {
  id: string | undefined;
  q: string;
  page: number;
  limit: number;
}

export const useCompanyJobsQuery = (props: Props) => {
  const { id, q, page, limit } = props;

  return useQueryWithSideEffects({
    queryKey: ["company", id, q, page, limit],
    queryFn: () => getComapanyJobs(id!, q, page, limit),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
