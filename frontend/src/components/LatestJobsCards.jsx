import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, Clock7, Locate, MapPin } from "lucide-react";
import { Button } from "./ui/button";

const LatestJobsCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="flex flex-col gap-5 bg-white p-5 rounded-md border border-gray-100 shadow-xl cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <img src={job?.company?.logo} alt="" className="rounded-md h-12 w-12" />

        <div>
          <h1 className="capitalize font-semibold">{job?.company?.name}</h1>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={15} />
            Bangladesh
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-semibold capitalize ">{job?.title}</h1>
        <div className="flex gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-500 mr-3">
            <BriefcaseBusiness size={15} />
            Fulltime
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-500">
            <Clock7 size={15} />3 days ago
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-700">{job?.description}</p>
      <div className="flex items-center gap-2 ">
        <Badge
          className={
            "text-gray-500 rounded-md border-none font-bold bg-gray-100 py-2 px-3 "
          }
          variant="outline"
        >
          {job?.position}
        </Badge>
        <Badge
          className={
            " text-gray-500 rounded-md border-none font-bold bg-gray-100 py-2 px-3"
          }
          variant="outline"
        >
          {" "}
          {job?.jobType}
        </Badge>
      </div>
      <div className="flex justify-between">
        <Badge
          className={"text-blue-700 font-bold capitalize p-0 border-none"}
          variant="ghost"
        >
          ${job?.salary}/hour
        </Badge>
        <button className="rounded-md px-3 py-2 text-sm font-semibold text-blue-900 bg-blue-100">
          Apply now
        </button>
      </div>
    </div>
  );
};

export default LatestJobsCards;
