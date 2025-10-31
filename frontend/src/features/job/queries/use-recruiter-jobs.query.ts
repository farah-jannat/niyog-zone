import { getRecruiterJobs } from "@/features/job/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

interface Props {
  id: string | undefined;
  q: string;
  page: number;
  limit: number;
}

export const useRecruiterJobsQuery = (props: Props) => {
  const { id, q, page, limit } = props;

  return useQueryWithSideEffects({
    queryKey: ["recruiter", id, q, page, limit],
    queryFn: () => getRecruiterJobs(id!, q, page, limit),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
