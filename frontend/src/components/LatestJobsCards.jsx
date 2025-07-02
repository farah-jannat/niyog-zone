import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Clock7, Locate, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-select";

const LatestJobsCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="max-w-[200px] p-2 flex shadow-md flex-col gap-2 sm:p-5 gap-5 bg-white rounded-md border border-gray-150  cursor-pointer mt-10   lg:max-w-[260px]"
    >
      <h1 className="font-semibold capitalize text-[14px]  text-[#333] text-normal">
        {job?.title}
      </h1>
      <div className="flex gap-1 items-center text-[12px] font-semibold -mt-[6px]">
        <div className="flex gap-1 items-center text-gray-500 mr-3">
          <BriefcaseBusiness size={15} />
          Fulltime
        </div>
        <div className="flex gap-1 items-center text-gray-500">
          <Clock7 size={15} />3 days ago
        </div>
      </div>

      <div className="flex  flex-wrap items-center gap-2 ">
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <Badge
            className={
              "text-gray-500 text-[10px] md:text-[12px] rounded-md border-none font-bold bg-blue-100 py-1 px-3 "
            }
            variant="outline"
          >
            {/* {job?.position} */}
            Next
          </Badge>
        ))}

        {/* <Badge
          className={
            " text-gray-500 rounded-md border-none font-bold bg-blue-100 py-1 px-3"
          }
          variant="outline"
        >
          {" "}
          {job?.jobType}
          Adobe xd
        </Badge>
        <Badge
          className={
            " text-gray-500 rounded-md border-none font-bold bg-blue-100 py-1 px-3"
          }
          variant="outline"
        >
          {" "}
          {job?.jobType}
          linux
        </Badge>
        <Badge
          className={
            " text-gray-500 rounded-md border-none font-bold bg-blue-100 py-1 px-3"
          }
          variant="outline"
        >
          {" "}
          {job?.jobType}
          Figma
        </Badge>
        <Badge
          className={
            " text-gray-500 rounded-md border-none font-bold bg-blue-100 py-1 px-3"
          }
          variant="outline"
        >
          {" "}
          {job?.jobType}
          React
        </Badge> */}
      </div>

      <Separator className=" border-gray-100 border-t" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={job?.company?.logo}
            alt=""
            className="rounded-full h-12 w-12"
          />

          <div>
            <h1 className="capitalize text-normal font-semibold">
              {job?.company?.name}
            </h1>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin size={15} />
              Bangladesh
            </div>
          </div>
        </div>

        <div className="text-blue-700 font-bold capitalize p-0 border-none flex flex-col items-end">
          <h1 className="text-Blue font-semibold text-lg">
            ${job?.salary}
            <span className="text-[12px] font-semibold text-gray-500">
              /Hour
            </span>
          </h1>

          <span className="text-[12px] text-green-500 font-semibold">
            Full Time
          </span>
        </div>
      </div>

      {/* <p className="text-sm text-gray-700">{job?.description}</p> */}
    </div>
  );
};

export default LatestJobsCards;
