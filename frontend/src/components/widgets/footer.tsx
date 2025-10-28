import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import React from "react";

const Footer = () => {
  return (
    <div className="card-gradient-brown px-[60px] flex flex-col items-startl gap-[15px] pt-[47px] pb-[15px]">
      <div className=" flex items-start justify-between gap-[50px] w-full">
        <div className="grid gap-[35px] ">
          <div>
            <h1 className="text-[18px]  ">
              <span className="text-[#287992]">Niyog</span>
              <span className="text-[#E8C092]">Zone</span>
            </h1>
          </div>
          <p className="text-[14px] text-[#393939] w-[228px]">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex items-center gap-[12px]">
            <div className="w-[24px] h-[24px] grid border border-[#6392D8]  place-items-center rounded-full bg-[#FFFFFF]">
              <Twitter size={14} color="#6392D8" />
            </div>
            <div className="w-[24px] h-[24px] grid place-items-center rounded-full bg-[#6392D8]">
              <Facebook size={14} color="#FFFFFF" />
            </div>
            <div className="w-[24px] h-[24px] grid border border-[#6392D8]  place-items-center rounded-full bg-[#FFFFFF]">
              <Instagram size={14} color="#6392D8" />
            </div>
            <div className="w-[24px] h-[24px] grid border border-[#6392D8] place-items-center rounded-full bg-[#FFFFFF]">
              <Github size={14} color="#6392D8" />
            </div>
          </div>
        </div>

        <div className=" text-[14px] text-[#35373F] hidden sm:grid gap-[13px]">
          <h2 className="text-[#03050F] font-bold">COMPANY</h2>
          <span>Features</span>
          <span>Works</span>
          <span>Carear</span>
          <span>About</span>
        </div>
        <div className=" text-[14px] text-[#35373F] hidden sm:grid gap-[13px]">
          <h2 className="text-[#03050F] font-bold">HELP</h2>
          <span>Customer Support</span>
          <span>Delivery Details</span>
          <span>Terms & Conditions</span>
          <span>Privary Policy</span>
        </div>
        <div className=" text-[14px] text-[#35373F] hidden md:grid gap-[13px]">
          <h2 className="text-[#03050F] font-bold">FAQ</h2>
          <span>Account</span>
          <span>Manage Deliveries</span>
          <span>Orders</span>
          <span>Payments</span>
        </div>
        <div className=" text-[14px] text-[#35373F] hidden lg:grid gap-[13px]">
          <h2 className="text-[#03050F] font-bold">COMPANY</h2>
          <span>Features</span>
          <span>Works</span>
          <span>Carear</span>
          <span>About</span>
        </div>
      </div>
      <Separator className="border-b" />
      <div className="flex items-center justify-between ">
        <p className="text-[12px] text-[#393939]">
          Kajbazar @ 2025, All Rights Reserved
        </p>
        <div className="hidden sm:flex items-center gap-[8px]">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-[24px] h-[24px] grid border border-[#6392D8]  place-items-center rounded-full bg-[#FFFFFF]"
            >
              <Twitter size={14} color="#6392D8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
