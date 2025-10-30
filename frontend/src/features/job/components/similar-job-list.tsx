"use client";

import JobCard from "@/features/job/components/job-card";
import { useLatestJobsQuery } from "@/features/job/queries/use-latest-jobs.query";
import React from "react";

const SimilarJobList = () => {
  // ** --- Queries ---
  const { isLoading, data, error } = useLatestJobsQuery({
    page: 1,
    limit: 6,
  });

  if (isLoading) return <h1>loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="mt-[68px]">
      <div className="max-h-[76px] my-[68px] flex items-center justify-between">
        <div>
          <p className="text-[#3E3F47] text-[12px]">
            Similar Jobs You Can Apply Right Now
          </p>
          <h2 className="text-[32px] text-[#0E0F19] font-medium">
            Similar Jobs
          </h2>
        </div>

        {/* <button
          onClick={() => router.push("/jobs")}
          className=" bg-[#E8C092] text-[#03050F]  w-[89px] h-[33px]  rounded-lg text-[14px] cursor-pointer"
        >
          Explore
        </button> */}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data && data?.jobs?.length <= 0 && <span>No Job Available</span>}
        {data && data?.jobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
};

export default SimilarJobList;
