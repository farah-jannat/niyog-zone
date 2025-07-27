import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./updateProfileDialog";
import { useSelector } from "react-redux";
import Navbar_two from "./shared/Navbar_two";

const skills = ["Html", "javascript", "python", "c++", "css"];
const isResume = true;

const CompanyProfile = () => {
  const { singleCompany } = useSelector((store) => store.company);
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
