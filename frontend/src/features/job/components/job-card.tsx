"use client";

import { Badge } from "@/components/ui/badge";
import { Job } from "@/features/job/schemas/job.schema";
import { useRouter } from "next/navigation";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";

interface Props {
  job: Job;
}

const JobCard = (props: Props) => {
  // ** --- props ---
  const { job } = props;
  // const {
  //   companyId,
  //   createdAt,
  //   createdBy,
  //   description,
  //   experienceLevel,
  //   id,
  //   jobType,
  //   location,
  //   position,
  //   requirements,
  //   salary,
  //   title,
  //   updatedAt,
  // } = props;

  const router = useRouter();

  return (
    <div
      className="flex flex-col cursor-pointer items-start gap-3.5 p-[24px]  w-full bg-[#FEFEFF] rounded-[8px] "
      // onClick={() => router.push(`/description/${job?.id}`)}
      onClick={() => router.push(`/jobs/${job?.id}`)}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          router.push(`/companies/${job.companyId}`);
        }}
        className="flex items-center gap-[12px] cursor-pointer"
      >
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
            {formatDistanceToNow(job.createdAt)} ago
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
          {/* Senior */}
          {job.jobLevel}
        </Badge>
        <Badge
          className={
            "text-[#35373F] text-[12px] font-medium rounded-[4px] border-none  bg-[#ECF8DF] p-[8px] capitalize "
          }
          variant="outline"
        >
          {/* Remote */}
          {["remote", "onsite"][Math.random() < 0.5 ? 0 : 1]}
        </Badge>
        <Badge
          className={
            "text-[#35373F] text-[12px] font-medium rounded-[4px] border-none  bg-[#ECF8DF] p-[8px] capitalize "
          }
          variant="outline"
        >
          {/* position {job?.position} */}
          {/* PartTime */}
          {job.jobType}
        </Badge>
      </div>

      <div className="max-h-[92px] w-full  p-4 leading-5 rounded-lg bg-[#FDF9F4] text-[14px] text-[#35373F]">
        <p className="overflow-hidden line-clamp-3 text-ellipsis">
          {job.description}
        </p>
      </div>

      <div className="flex items-center justify-between  w-full ">
        <div className=" font-bold flex flex-col gap-1">
          <h1 className="text-Blue  text-md text-[20px] text-[#03050F]">
            ${job?.salary}
            <span className=" text-Apple_Green">/hr</span>
          </h1>
          <p className="text-[14px] text-[#68696F] font-normal">
            {job.location}
          </p>
        </div>

        <button
          className=" bg-[#5394A8] hover:bg-[#488091] text-[#F5F6FD]  w-[89px] h-[33px]  rounded-lg text-[14px] cursor-pointer"
          onClick={() => router.push(`/jobs/${job?.id}`)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default JobCard;
