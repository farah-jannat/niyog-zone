import JobCard from "@/features/job/components/job-card";
import JobTable from "@/features/job/components/job-table";
import { useRecruiterJobsQuery } from "@/features/job/queries/use-recruiter-jobs.query";

interface Props {
  recruiterId: string | undefined;
}

const RecruiterJobList = (props: Props) => {
  const { recruiterId } = props;

  //   ** -- queries ---
  const { isLoading: isjobLoading, data } = useRecruiterJobsQuery({
    id: recruiterId,
    q: "",
    page: 1,
    limit: 6,
  });

  if (isjobLoading) return null;

  return <JobTable jobs={data?.jobs} />;

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {data && data?.jobs?.length <= 0 && <span>No Job Available</span>}
      {data && data?.jobs.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
};

export default RecruiterJobList;
