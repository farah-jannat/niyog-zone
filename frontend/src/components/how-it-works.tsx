import React from "react";
import { howItWorkSteps } from "@/constants";

const HowItWorks = () => {
  return (
    <div className="mt-[68px] pt-10 pb-[100px]">
      <div className="grid place-items-center pb-10">
        <p className="text-[#3E3F47] text-[12px]">Start Your Jouney</p>
        <h2 className="text-[32px] text-[#0E0F19] font-medium">How It Works</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {howItWorkSteps.map((item, i) => (
          <div
            className="bg-[#EAF2F4] grid gap-[70px] rounded-[8px] p-[18px] relative"
            key={i}
          >
            <div className="bg-[#A1DD5F] h-[45px] w-[45px] rounded-[4px] grid place-items-center font-[Roboto] font-medium text-[24px] text-white">
              {i + 1}
            </div>

            <div className="grid gap-[21px]">
              <h2 className="text-[#0E0F19] font-medium text-[19px]">
                {item.heading}
              </h2>
              <p className="text-[14px] text-[#3E3F47]">{item.subheading}</p>
            </div>

            <div className="rounded-bl-full card-gradient-green w-40 h-40 absolute top-0 right-0 " />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
