import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronDown, Home, MapPin, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Select, Separator } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ShowCounts from "./ShowCounts";

const populerSearches = ["Designer", "Mid", "Developer", "Senior Developer"];

const Category = {
  name: "category",
  categories: [
    "Software",
    "Healthcare and Wellness ",
    "Finance and Business",
    "Manufacturing and Engineering",
    "Education and Training",
    "Construction and Infrastructure",
    "Arts, Design, and Media",
    "Hospitality and Tourism",
  ],
};
const JobType = {
  name: "job type",
  types: [
    "Full time",
    "Part time",
    "Onsite",
    "Remote",
    "Hybrid",
    "Seasonal",
    "Contract",
  ],
};

const JobLabel = {
  name: "job label",
  labels: [
    "Junior",
    "Mid-Level",
    "Senior",
    "Lead-Principal",
    "Manager",
  ],
};
const Experience = {
  name: "experience",
  experiences: [
    "1 year",
    "3 year",
    "4 year",
    "5 year",
    "10 year",
  ],
};
const Salary = {
  name: "salary",
  salarys: [
    "30K",
    "50K",
    "60K",
    "100K",
    "250K",
  ],
};
// const filter1 = {
//   name: "Software & Development",
//   icon: "Home",
//   array: [
//     "All",
//     "Software",
//     "mid",
//     "Finance",
//     "Marketing",
//     "Management",
//     "Design",
//   ],
// };

// const filter2 = {
//   name: "location",
//   icon: "MapPin",
//   array: ["All", "Dhaka", "Florida", "Bonani"],
// };

const HeroSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const Startups = {
    counts: "200",
    suffix: "M",
    title: "Active Jobs",
  };
  const Talents = {
    counts: "40",
    suffix: "K",
    title: "Startups",
  };
  const Jobs = {
    counts: "340",
    suffix: "K",
    title: "Talents",
  };

  // Get a specific query parameter
  // const category = searchParams.get("category");
  const page = searchParams.get("page");

  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    console.log("the que is = ", query);
    // navigate("/jobs");
    // navigate(`/jobs?search=${query}&industry=${industry}&location=${location}`);
    navigate(
      `/jobs?search=${query}&category=${category}&type=${type}&experience=${experience}&salary=${salary}&label=${label}`
    );

    // console.log("hello");
    // dispatch(setSearchedQuery(query));
  };

  return (
    <div className="mx-auto ">
      <div className="flex flex-col gap-y-[8px]">
        <h1 className="text-[28px] sm:text-[48px] lg:text-[88px] text-[#03050F] font-bold  mt-[48px]">
          Your <span className="text-[#A1DD5F]">Next</span> Career Awaits
        </h1>
        <p className="text-[#03050F] max-w-[315px] text-[16px]">
          Explore job opportunities at the world's most innovative companies{" "}
        </p>
      </div>

      <div className="mt-[68px] min-h-[344px]     grid  gap-[24px] lg:grid-cols-12 grid-row-2 ">
        {/* <form className="grid  gap-[23px] col-span-6  row-span-2 bg-[#EAF2F4] p-[24px]   mx-auto lg:mx-0">
          <div className="flex flex-col items-start max-w-[full] gap-[8px]">
            <Label className="text-[#03050F]">Keywords</Label>
            <Input
              type="text"
              placeholder="Search Job Keywords.."
              className="p-[20px]"
            />
          </div>
          <div className="flex flex-col items-start max-w-[full] gap-[8px]">
            <Label className="text-[#03050F]">Category</Label>
            <div className=" w-full">
              <Select onValueChange={(value) => setIndustry(value)}>
                <SelectTrigger className="w-full p-[20px]">
                  <SelectValue placeholder={filter1.name} />
                </SelectTrigger>
                <SelectContent>
                  {filter1.array.map((item, idx) => (
                    <>
                      <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                        <SelectItem value={item}>{item}</SelectItem>
                      </div>

                      <Separator className="border-b" />
                    </>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col items-start max-w-[full] gap-[8px]">
            <Label className="text-[#03050F]">Job Type</Label>
            <div className=" w-full">
              <Select onValueChange={(value) => setIndustry(value)}>
                <SelectTrigger className="w-full p-[20px]">
                  <SelectValue placeholder="All Type" />
                </SelectTrigger>
                <SelectContent>
                  {filter1.array.map((item, idx) => (
                    <>
                      <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                        <SelectItem value={item}>{item}</SelectItem>
                      </div>

                      <Separator className="border-b" />
                    </>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col items-start max-w-[full] gap-[8px]">
            <Label className="text-[#03050F]">Experience</Label>
            <div className=" w-full">
              <Select onValueChange={(value) => setIndustry(value)}>
                <SelectTrigger className="w-full p-[20px]">
                  <SelectValue placeholder="1 year" />
                </SelectTrigger>
                <SelectContent>
                  {filter1.array.map((item, idx) => (
                    <>
                      <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                        <SelectItem value={item}>{item}</SelectItem>
                      </div>

                      <Separator className="border-b" />
                    </>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col items-start max-w-[full] gap-[8px]">
            <Label className="text-[#03050F]">Expected Sallary</Label>
            <div className=" w-full">
              <Select onValueChange={(value) => setIndustry(value)}>
                <SelectTrigger className="w-full p-[20px]">
                  <SelectValue placeholder="$500 - $1000 PA" />
                </SelectTrigger>
                <SelectContent>
                  {filter1.array.map((item, idx) => (
                    <>
                      <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                        <SelectItem value={item}>{item}</SelectItem>
                      </div>

                      <Separator className="border-b" />
                    </>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <button className="h-[56px] text-[16px] font-medium text-[#F5F6FD] bg-[#287992] rounded-[8px]">
            Search Result
          </button>
        </form> */}

        <div className="col-span-6 rounded-sm row-span-2">
          <form className="grid grid-cols-12  gap-[23px] col-span-6  row-span-2    card-gradient-bluish p-[24px]   mx-auto lg:mx-0">
            <div className="flex flex-col col-span-12 items-start max-w-[full] gap-[8px]">
              <Label className="text-[#03050F]">Keywords</Label>
              <Input
                type="text"
                placeholder="Search Job Keywords.."
                onChange={(e) => setQuery(e.target.value)}
                className="p-[20px] "
              />
            </div>
            <div className="flex flex-col col-span-6 items-start max-w-[full] gap-[8px]">
              <Label className="text-[#03050F]">Category</Label>
              <div className=" w-full">
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-full p-[20px]">
                    <SelectValue placeholder={Category.name} />
                  </SelectTrigger>
                  <SelectContent>
                    {Category.categories.map((item, idx) => (
                      <>
                        <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                          <SelectItem value={item}>{item}</SelectItem>
                        </div>

                        <Separator className="border-b" />
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col col-span-6 items-start max-w-[full] gap-[8px]">
              <Label className="text-[#03050F]">Job Type</Label>
              <div className=" w-full">
                <Select onValueChange={(value) => setType(value)}>
                  <SelectTrigger className="w-full p-[20px]">
                    <SelectValue placeholder="All Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JobType.types.map((item, idx) => (
                      <>
                        <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                          <SelectItem value={item}>{item}</SelectItem>
                        </div>

                        <Separator className="border-b" />
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col col-span-6 items-start max-w-[full] gap-[8px]">
              <Label className="text-[#03050F]">Job Level</Label>
              <div className=" w-full">
                <Select onValueChange={(value) => setLabel(value)}>
                  <SelectTrigger className="w-full p-[20px]">
                    <SelectValue placeholder="All Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JobLabel.labels.map((item, idx) => (
                      <>
                        <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                          <SelectItem value={item}>{item}</SelectItem>
                        </div>

                        <Separator className="border-b" />
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col col-span-6 items-start max-w-[full] gap-[8px]">
              <Label className="text-[#03050F]">Experience</Label>
              <div className=" w-full">
                <Select onValueChange={(value) => setExperience(value)}>
                  <SelectTrigger className="w-full p-[20px]">
                    <SelectValue placeholder="1 year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Experience.experiences.map((item, idx) => (
                      <>
                        <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                          <SelectItem value={item}>{item}</SelectItem>
                        </div>

                        <Separator className="border-b" />
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col col-span-12 items-start max-w-[full] gap-[8px]">
              <Label className="text-[#03050F]">Expected Sallary</Label>
              <div className=" w-full">
                <Select onValueChange={(value) => setSalary(value)}>
                  <SelectTrigger className="w-full p-[20px]">
                    <SelectValue placeholder="$500 - $1000 PA" />
                  </SelectTrigger>
                  <SelectContent>
                    {Salary.salarys.map((item, idx) => (
                      <>
                        <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                          <SelectItem value={item}>{item}</SelectItem>
                        </div>

                        <Separator className="border-b" />
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <button
              onClick={searchJobHandler}
              className="h-[56px] text-[16px] col-span-12 font-medium text-[#F5F6FD] bg-[#287992] rounded-[8px]"
            >
              Search Result
            </button>
          </form>
        </div>
        <ShowCounts
          data={Jobs}
          className="col-span-3 row-span-1  rounded-sm "
        />

        <ShowCounts
          data={Startups}
          className="col-span-3 row-span-1  rounded-sm "
        />

        <ShowCounts
          data={Talents}
          className="col-span-6 row-span-1 rounded-sm "
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className=" border border-gray-200 text-gray-500 rounded-md py-2 pl-5 flex items-center gap-3 shadow-lg  mx-auto w-[full] ">
        <div className="flex flex-1 items-center gap-2 ">
          <Search size={20} />
          <Input
            type="text"
            placeholder="Your Keyword"
            onChange={(e) => setQuery(e.target.value)}
            className="border-none w-full px-0 outline-none"
          />
        </div>
        <span className="hidden md:block">|</span>
        Industry
        <div className="hidden md:block">
          <Select
            className="outline-none border-none"
            onValueChange={(value) => setIndustry(value)}
          >
            <SelectTrigger className="w-[180px] outline-none border-none">
              <SelectValue
                className="outline-none border-none"
                placeholder={filter1.name}
              />
            </SelectTrigger>
            <SelectContent>
              {filter1.array.map((item, idx) => (
                <>
                  <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                    <Label
                      onClick={() => navigate(`/jobs?search=${item}`)}
                      className="text-sm font-normal text-gray-500 cursor-pointer hover:text-gray-900"
                    >
                      {item}
                    </Label>

                    <span className="bg-light_purple rounded-md py-1 px-1 font-bold text-blue-900 text-[10px]">
                      29
                    </span>
                    <SelectItem value={item}>{item}</SelectItem>
                  </div>

                  <Separator className="border-b" />
                </>
              ))}
            </SelectContent>
          </Select>
        </div>
        filter 2
        <div className="hidden md:block">
          <Select onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={filter2.name} />
            </SelectTrigger>
            <SelectContent>
              {filter2.array.map((item, idx) => (
                <>
                  <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                    <SelectItem value={item}>{item}</SelectItem>
                  </div>
                  <Separator className="border-b" />
                </>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={searchJobHandler} className="rounded-md bg-Blue">
          search
        </Button>
      </div>
      <p className="hidden sm:flex items-center gap-3 text-text_white  mx-auto">
        {" "}
        popular searches:{"   "}
        {populerSearches.map((item, idx) => (
          <span
            // onClick={(e) => {
            //   setQuery(item); // First, set the query
            //   searchJobHandler(); // Then, call the search handler
            // }}
            onClick={() => navigate(`/jobs?search=${item}`)}
            className="underline cursor-pointer"
          >
            {item},
          </span>
        ))}
      </p>
      {/* <p className="hidden sm:block text-text_white ">
          popular searches:{"   "}
          <a
            onClick={(e) => {
              setQuery("Designer"); // First, set the query
              searchJobHandler(); // Then, call the search handler
            }}
            className="underline"
            href="#"
          >
            Designer,
          </a>
          {"  "}
          <a
            onClick={(e) => {
              setQuery("mid"); // First, set the query
              searchJobHandler(); // Then, call the search handler
            }}
            className="underline"
            href="#"
          >
            mid,{"  "}
          </a>
          <a className="underline" href="">
            IOS Developer,
          </a>
          {"  "}
          <a className="underline" href="">
            Php
          </a>
        </p> */}
    </div>
  );
};

export default HeroSection;
