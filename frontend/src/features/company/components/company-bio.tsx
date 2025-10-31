"use client";

import { Company } from "@/features/company/schemas/company.schema";
import { ExternalLink, MapPin } from "lucide-react";

interface Props {
  company?: Company;
}

const CompanyBio = (props: Props) => {
  const { company } = props;

  return (
    <div className="relative flex flex-col p-[34px] gap-6 text-[#03050F] card-gradient-bluish rounded-[8px] min-h-[392px] text-[16px] z-10 overflow-hidden">
      <div className="flex items-start gap-4">
        <img
          src={company?.logo}
          alt="company-logo"
          className="rounded-[4px] h-[70px] w-[70px]"
        />

        <div className="flex flex-col gap-1">
          <h1 className="capitalize text-[#03050F] font-bold text-[20px]">
            {company?.name}
          </h1>
          <div className="text-[#35373F]">{company?.category}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="w-[385px] text-[#03050F]">{company?.description}</p>
        <div className="flex items-start  gap-2">
          <MapPin size={24} className="text-[#03050F]" />
          <h3 className=" text-[#03050F] ">{company?.location}</h3>
        </div>
        <div className="flex items-start gap-2 min-w-[186px]  ">
          <ExternalLink size={24} className="text-[#03050F]" />
          <h3 className=" text-[#03050F] ">{company?.website}</h3>
        </div>
      </div>

      {/* design elements */}

      <div className="bg-[#F6FCEF] w-[116px] h-[116px] rounded-full absolute -z-10 right-[100px] -top-[50px] card-gradient-green" />
      <div className="bg-[#F6FCEF] w-[210px] h-[210px] rounded-full absolute -z-10 right-[300px] card-gradient-green" />
      <div className="bg-[#F6FCEF] w-[318px] h-[318px] rounded-full absolute -z-12 -right-[150px] -bottom-[150px] card-gradient-green" />

      <div className="bg-[#F6FCEF] w-[175px] h-[175px] rounded-full absolute -z-10 right-[400px] -bottom-[120px] card-gradient-green" />
    </div>
  );
};

export default CompanyBio;
