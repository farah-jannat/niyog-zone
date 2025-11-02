import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

import { checkApplication } from "@/features/application/api/queries.api";

export const useCheckApplicationQuery = (
  applicantId?: string,
  jobId?: string,
  dep?: boolean
) => {
  return useQueryWithSideEffects({
    queryKey: ["application", applicantId, jobId],
    queryFn: () => checkApplication(applicantId!, jobId!),
    enabled: !!applicantId && !!jobId && !!dep,
    refetchOnWindowFocus: false,
    staleTime: 0,
    // gcTime: Infinity,
  });
};
