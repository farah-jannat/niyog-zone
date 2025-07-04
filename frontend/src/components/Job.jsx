import React from "react";
import { Button } from "./ui/button";
import { Bookmark, BriefcaseBusiness, Clock7 } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      className="flex-1 p-3 sm:p-5 max-w-[500px] rounded-xl hover:bg-White border border-gray-100 sm:max-w-[250px] flex flex-col gap-4 cursor-pointer"
      onClick={() => navigate(`/description/${job?._id}`)}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-between  w-full">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px]">
              <img
                src={job?.company?.logo}
                alt=""
                className="w-full h-full rounded-md"
              />
            </div>

            <div>
              <h1 className="font-semibold text-Black capitalize">
                {job?.company?.name}
              </h1>
              <p className="text-[12px] text-gray-500">Bangladesh</p>
            </div>
          </div>
          {/* <Button variant="outline" className="rounded-full" size="icon"> */}
          <Bookmark className="text-green-500 " size={18} />
          {/* </Button> */}
        </div>
      </div>

      <h1 className="font-semibold text-Black">{job?.title}</h1>
      <p className=" text-sm leading-[1.6] text-gray-600">{job?.description}</p>

      <div className="flex gap-1 items-center text-[12px] font-semibold -mt-[6px]">
        <div className="flex gap-1 items-center text-gray-500 mr-3">
          <BriefcaseBusiness size={15} />
          Fulltime
        </div>
        <div className="flex gap-1 items-center text-gray-500">
          <Clock7 size={15} />
          <p>
            {daysAgoFunction(job?.createdAt) == 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
        </div>
      </div>

      <div className="flex  flex-wrap items-center gap-2 ">
        {[1, 2].map((item, idx) => (
          <Badge
            className={
              "text-gray-500 text-[10px] md:text-[12px] rounded-md border-none  bg-light_purple py-1 px-3 "
            }
            variant="outline"
          >
            {/* {job?.position} */}
            Next
          </Badge>
        ))}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-blue-700 font-bold capitalize p-0 border-none flex flex-col items-end">
          <h1 className="text-Blue font-semibold text-lg">
            ${job?.salary}
            <span className="text-[12px] font-semibold text-gray-500">
              /Hour
            </span>
          </h1>
        </div>
        {/* <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div> */}
        <button className="px-4 py-2 bg-light_purple text-Blue font-semibold text-sm rounded-md hover:bg-Blue hover:text-White">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Job;
