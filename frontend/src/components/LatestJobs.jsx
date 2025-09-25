import React from "react";
import LatestJobsCards from "./LatestJobsCards";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  console.log("all job here", allJobs);
  const navigate = useNavigate();
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
       
        <button className=" bg-[#E8C092] text-[#03050F]  w-[89px] h-[33px]  rounded-[4px] text-[14px]">
          Explore
        </button> 
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-5"> */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
          {allJobs?.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs?.slice(0, 6).map((job) => (
              <div>
                {" "}
                <LatestJobsCards key={job.id} job={job} />
              </div>
            ))
          )}
        </div>
      {/* </div> */}
      {/* <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4">
          <div className=" flex items-center gap-2 border border-Blue rounded-md px-3 py-2">
            <Home size={20} className="text-Blue" />
            <button className="text-sm font-semibold text-Blue ">
              Marketing
            </button>
          </div>
          {["Marketing", "Software", "UI/UX", "Develop", "Mid", "Senior"].map(
            (item, idx) => (
              <div
                className="flex items-center gap-2 border border-gray-150 rounded-md px-3 py-2 text-sm font-[300] cursor-pointer bg-[rgb(37,36,209,.8)] text-white"
                onClick={() => {
                  navigate(`/jobs?search=${item}`);
                }}
              >
                <Home size={22} strokeWidth="1" className="text-blue-900" />

                {item}
              </div>
            )
          )}
        </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-5">
      <div className="flex items-center justify-center  gap-3 flex-wrap ">
        {allJobs?.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            <div>
              {" "}
              <LatestJobsCards key={job.id} job={job} />
            </div>
          ))
        )}
      </div>
    </div> */}
    </div>
  );
};

export default LatestJobs;
