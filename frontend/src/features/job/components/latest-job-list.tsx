import JobCard from "@/features/job/components/job-card";
import { useRouter } from "next/navigation";
import React from "react";

const LatestJobList = () => {
  //   const { allJobs } = useSelector((store) => store.job);
  const allJobs = [];

  //   console.log("all job here", allJobs);
  const router = useRouter();

  return (
    <div className="mt-[68px]">
      <div className="max-h-[76px] my-[68px] flex items-center justify-between">
        <div>
          <p className="text-[#3E3F47] text-[12px]">
            Top Jobs You Can Apply Right Now
          </p>
          <h2 className="text-[32px] text-[#0E0F19] font-medium">
            Latest Jobs
          </h2>
        </div>

        <button
          onClick={() => router.push("/jobs")}
          className=" bg-[#E8C092] text-[#03050F]  w-[89px] h-[33px]  rounded-lg text-[14px]"
        >
          Explore
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {allJobs?.length <= 0 && <span>No Job Available</span>}
        {allJobs?.length > 0 && <JobCard key={job.id} job={job} />}
      </div>
    </div>
  );
};

export default LatestJobList;
