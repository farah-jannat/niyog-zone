import React from "react";
import { howItWorkSteps } from "@/constants";

const HowItWorks = () => {
  return (
    <>
      <div className="grid place-items-center pb-10">
        <p className="text-[#3E3F47] text-[12px]">Start Your Jouney</p>
        <h2 className="text-[32px] text-[#0E0F19] font-medium">How It Works</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {howItWorkSteps.map((item, i) => (
          <div
            className="bg-[#EAF2F4] grid gap-[70px] rounded-[8px] p-[18px] relative overflow-hidden z-0"
            key={i}
          >
            <div className="bg-[#A1DD5F] h-[45px] w-[45px] rounded-[8px] grid place-items-center font-lato font-medium text-[24px] text-[#03050F]">
              {i + 1}
            </div>

            <div className="grid gap-[21px]">
              <h2 className="text-[#0E0F19] font-medium text-[19px]">
                {item.heading}
              </h2>
              <p className="text-[14px] text-[#3E3F47]">{item.subheading}</p>
            </div>

            <div className="rounded-[100px] card-gradient-green w-56 h-56 absolute -top-20 -right-15 -z-10" />
          </div>
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
