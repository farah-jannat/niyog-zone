import { BadgeCheck } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const HomeCreateProfile = () => {
  return (
    <div className="bg-[#EDF2FC] mt-10 flex items-center justify-center">
      <div className="flex flex-col gap-10 w-[90%] sm:flex-row items-center sm:gap-20 sm:w-[80%] mx-auto  my-10   ">
        <div className="flex-1 ">
          <img
            src="../../public/Home_Create_profile.png"
            alt=""
            className="w-[full] h-[full]"
          />
        </div>

        <div className="flex-1  flex flex-col gap-10">
          <h2 className="text-2xl font-semibold ">
            Job search for people <br /> passionate about startup
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3 ">
              <div>
                <BadgeCheck size={20} className="text-green-500" />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold capitalize text-normal">
                  Create an account
                </h1>
                <p className="text-gray-500 ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Numquam nulla aperiam, Lorem ipsum dolor sit amet. Lorem ipsum
                  dolor sit amet consectetur adipisicing.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 ">
              <div>
                <BadgeCheck size={20} className="text-green-500" />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold capitalize text-normal">
                  Search for jobs
                </h1>
                <p className="text-gray-500 ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Numquam nulla aperiam, Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 ">
              <div>
                <BadgeCheck size={20} className="text-green-500" />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold capitalize text-normal">
                  Save & Apply
                </h1>
                <p className="text-gray-500 ">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Numquam nulla aperiam, Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
          <Button className="bg-green-700 hover:bg-green-800 w-[200px]">
            Create an Account
          </Button>
        </div>
      </div>
      //{" "}
    </div>
  );
};

export default HomeCreateProfile;
