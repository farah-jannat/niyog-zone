"use client";

import JobCard from "@/features/job/components/job-card";
import { Job } from "@/features/job/schemas/job.schema";
import { useRouter } from "next/navigation";

interface Props {
  heading: string;
  subHeading?: string;
  isBtn?: boolean;
  isLoading: boolean;
  jobs?: Job[];
  limit?: number;
  error?: Error | null;
}

const JobList = (props: Props) => {
  const { heading, subHeading, isBtn, isLoading, jobs, limit, error } = props;

  const router = useRouter();

  // ** --- Queries ---

  if (isLoading) return <h1>loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="">
      <div className="max-h-[76px] flex items-center justify-between">
        <div>
          <p className="text-[#3E3F47] text-[12px]">
            {/* Top Jobs You Can Apply Right Now */}
            {subHeading}
          </p>
          <h2 className="text-[32px] text-[#0E0F19] font-medium">
            {/* Latest Jobs */}
            {heading}
          </h2>
        </div>

        {isBtn && (
          <button
            onClick={() => router.push("/jobs")}
            className=" bg-[#E8C092] text-[#03050F]  w-[89px] h-[33px]  rounded-lg text-[14px] cursor-pointer"
          >
            Explore
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-[52px]">
        {jobs && jobs?.length <= 0 && <span>No Job Available</span>}
        {jobs && jobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
};

export default JobList;
