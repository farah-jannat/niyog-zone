import { BadgeCheck } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const HomeCreateProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-[68px] pt-[40px] pb-[100px]">
      <div className="grid place-items-center pb-[40px]">
        <p className="text-[#3E3F47] text-[12px]">Start Your Jouney</p>
        <h2 className="text-[32px] text-[#0E0F19] font-medium">How It Works</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {[1, 2, 3, 4].map(() => (
          <div className="bg-[#EAF2F4] grid gap-[70px] rounded-[8px] p-[18px] relative">
            <Badge
              className={
                "text-[#03050F] text-[24px] font-medium rounded-[8px] border-none  bg-[#A1DD5F] h-[45px] w-[44px] grid place-items-center"
              }
              variant="outline"
            >
              1
            </Badge>
            <div className="grid gap-[21px]">
              <h2 className="text-[#0E0F19] font-medium text-[19px]">
                Create a Gig
              </h2>
              <p className="text-[14px] text-[#3E3F47]">
                Sign up for free, set up your Gig, and offer your work to our
                global audience.
              </p>
            </div>

            <div className="rounded-bl-full  bg-[#F6FCEF] w-[160px] h-[160px] absolute top-0 right-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCreateProfile;
