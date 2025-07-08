import React from "react";
import LatestJobsCards from "./LatestJobsCards";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  console.log("all job here", allJobs);
  const navigate = useNavigate()
  return (
    <div className="w-[90%] lg:w-[80%] mx-auto my-10">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold text-center">Latest Jobs Post</h2>
        <p className="text-gray-500 text-center">
          Find the job thats prfect for you, about 800+ new jobs everyday
        </p>
        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4">
          {/* <div className=" flex items-center gap-2 border border-Blue rounded-md px-3 py-2">
            <Home size={20} className="text-Blue" />
            <button className="text-sm font-semibold text-Blue ">
              Marketing
            </button>
          </div> */}
          {["Marketing", "Software", "UI/UX", "Develop", "Mid", "Senior"].map((item, idx) => (
            <div className="flex items-center gap-2 border border-gray-150 rounded-md px-3 py-2">
              <Home size={20} className="text-blue-900" />
              <button onClick={()=> {navigate(`/jobs?search=${item}`)}} className="text-sm font-semibold  ">{item}</button>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-5"> */}
      <div className="flex items-center justify-center  gap-3 flex-wrap ">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <div>
              {" "}
              <LatestJobsCards key={job._id} job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
