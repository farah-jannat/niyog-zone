import { useRouter } from "next/navigation";
import React from "react";

const JobCard = () => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col cursor-pointer items-start gap-3.5 p-[24px]  w-full bg-[#FEFEFF] rounded-[8px] "
      onClick={() => router.push(`/description/${job?.id}`)}
    >
      <div className="flex items-center gap-[12px]">
        <div className="w-[34px] h-[34px] bg-[#B60E0E87] border border-black rounded-full">
          <img src={job?.company?.logo} alt="" className=" rounded-full" />
        </div>
        <h1 className="text-[16px] font-medium text-[#03050F] capitalize">
          {job?.company?.name}
        </h1>
      </div>
      <div className="flex flex-col gap-[1px]">
        <div className="flex  items-center gap-[13px]">
          <p className="text-[14px] text-[#35373F]">Posted</p>
          <div className="flex gap-1 items-center text-[10px] text-[#68696F]">
            <p>5 days ago</p>
          </div>
        </div>

        <h1 className="font-bold text-[20px] text-[#03050F] capitalize">
          {job?.title}
        </h1>
      </div>

      <div className="flex items-center gap-[8px] ">
        <Badge
          className={
            "text-[#35373F] text-[12px] font-medium rounded-[4px] border-none  bg-[#ECF8DF] p-[8px] capitalize "
          }
          variant="outline"
        >
          {/* {job?.experienceLevel} years */}
          Senior
        </Badge>
        <Badge
          className={
            "text-[#35373F] text-[12px] font-medium rounded-[4px] border-none  bg-[#ECF8DF] p-[8px] capitalize "
          }
          variant="outline"
        >
          {/* position {job?.position} */}
          Remote
        </Badge>
        <Badge
          className={
            "text-[#35373F] text-[12px] font-medium rounded-[4px] border-none  bg-[#ECF8DF] p-[8px] capitalize "
          }
          variant="outline"
        >
          {/* position {job?.position} */}
          PartTime
        </Badge>
      </div>

      <div className="max-w-[full] p-[16px] leading-[20px] rounded-[4px] bg-[#FDF9F4] text-[14px] text-[#35373F]">
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its{" "}
        </p>
      </div>

      <div className="flex items-center justify-between  w-full ">
        <div className=" font-bold flex flex-col gap-[4px]">
          <h1 className="text-Blue  text-md text-[20px] text-[#03050F]">
            ${job?.salary}
            <span className=" text-Apple_Green">/hr</span>
          </h1>
          <p className="text-[14px] text-[#68696F] font-normal">
            San Francisco, CA
          </p>
        </div>

        <button className=" bg-[#5394A8] hover:bg-[#488091] text-[#F5F6FD]  w-[89px] h-[33px]  rounded-[4px] text-[14px]">
          View
        </button>
      </div>
    </div>
  );
};

export default JobCard;
