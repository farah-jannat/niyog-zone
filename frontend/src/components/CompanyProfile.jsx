import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, ExternalLink, Mail, MapPin, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./updateProfileDialog";
import { useSelector } from "react-redux";
import Navbar_two from "./shared/Navbar_two";
import Container from "./container";
import Footer from "./shared/Footer";

const skills = ["Html", "javascript", "python", "c++", "css"];
const isResume = true;

const CompanyProfile = () => {
  const { singleCompany } = useSelector((store) => store.company);

  return (
    <div className="bg-[#F5F6FD]">
      <Navbar />
      <Container>
        <div className="flex flex-col p-[34px] gap-[24px] text-[#03050F] card-gradient-bluish rounded-[8px] my-[68px] min-h-[392px] bg-[#EAF2F4] text-[16px]">
          <div
            onClick={() => {
              navigate(`/companyProfile/${singleCompany?.id}`);
            }}
            className=""
          >
            <div className="flex items-start gap-[16px]">
              <img
                // src={singleCompany?.logo}
                src="../../../public/company-logo.jpg"
                alt=""
                className="rounded-[4px] h-[70px] w-[70px]"
              />

              <div className="flex flex-col gap-[4px]">
                <h1 className="capitalize text-[#03050F] font-bold text-[20px]">
                  {singleCompany?.name}
                </h1>
                <div className="text-[#35373F]">
                  {/* {singleJob?.location} */}
                  Software & Consultancy
                </div>
                {/* <span>2 open jobs</span> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="w-[385px] text-[#03050F]">
              Exploring the world and capturing the small moments. Always
              learning, always growing.
              {singleCompany?.description}
            </p>
            <div className="flex items-start  gap-[8px] border-b">
              <p className="text-[#03050F]">
                {" "}
                <MapPin size={24} />{" "}
              </p>
              <h3 className=" text-[#03050F] ">Indonesia, Jakarta {singleCompany?.location}</h3>
            </div>
            <div className="flex items-start gap-[8px] border-b min-w-[186px]  ">
              <p className="text-[#03050F]">
                {" "}
                <ExternalLink size={24} />{" "}
              </p>
              <h3 className=" text-[#03050F] ">http//www.google.com/ {singleCompany?.website}</h3>
            </div>
          </div>
        </div>

        <div className="mb-[30px]">
          <p className="text-[#3E3F47] text-[12px]">
            The Company's
          </p>
          <h2 className="text-[32px] text-[#0E0F19] font-medium">
            All Jobs    </h2>
        </div>
        {/* All job of this company will show here  */}
      </Container>
      <Footer/>
    </div>
  );
  return (
    <div>
      <Navbar_two />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={singleCompany?.logo} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{singleCompany?.name}</h1>
              <p>{singleCompany?.description}</p>
              <p>{singleCompany?.website}</p>
              <p>{singleCompany?.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
