import { getRecruiterCompanies } from "@/features/company/api/queries.api";
import { useQueryWithSideEffects } from "@/hooks/useQueryWithSideEffects";

interface Props {
  recruiterId?: string;
}

export const useRecruiterCompaniesQuery = (props: Props) => {
  const { recruiterId } = props;

  return useQueryWithSideEffects({
    queryKey: ["recruiter-companies", recruiterId],
    queryFn: () => getRecruiterCompanies(recruiterId!),
    enabled: !!recruiterId,
    refetchOnWindowFocus: false,
  });
};
