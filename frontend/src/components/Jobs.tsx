import React, { useEffect, useState } from "react";
// import {} from "lucide-react"

import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import Footer from "./shared/Footer";
import {
  AlignLeft,
  ChevronDown,
  Home,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

import FilterCard_two from "./FilterCard_two";

import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "@radix-ui/react-select";
import { setSearchedQuery } from "@/redux/jobSlice";
import Navbar from "./shared/Navbar";
import Container from "./container";

const Category = {
  name: "Category",
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
  name: "Job Type",
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
  name: "Job Label",
  labels: ["Junior", "Mid-Level", "Senior", "Lead-Principal", "Manager"],
};
const Experience = {
  name: "Experience",
  experiences: ["1 year", "3 year", "4 year", "5 year", "10 year"],
};
const Salary = {
  name: "Salary",
  salarys: ["30K", "50K", "60K", "100K", "250K"],
};

const Jobs = () => {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const { allJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  // const industryValue = searchParams.get("industry");
  // const locationValue = searchParams.get("location");
  // const keywordValue = searchParams.get("keyword");
  const salaryValue = searchParams.get("salary") || "";
  const categoryValue = searchParams.get("category") || "";
  const typeValue = searchParams.get("type") || "";
  const experienceValue = searchParams.get("experience") || "";
  const labelValue = searchParams.get("label") || "";
  // const positionValue = searchParams.get("position");
  // const onsiteRemoteValue = searchParams.get("onsiteRemote");
  // const jobTypeValue = searchParams.get("jobType");
  // console.log("position", positionValue);

  const dispatch = useDispatch();

  const searchJobHandler = () => {
    console.log("value is here", searchValue);
    dispatch(setSearchedQuery(query));
    setSearchParams((prevParams) => {
      prevParams.set("search", query);
      // prevParams.set("industry", industry);
      // prevParams.set("location", location);
      // prevParams.set("keyword");
      prevParams.set("category", category);
      prevParams.set("type", type);
      prevParams.set("experience", experience);
      prevParams.set("label", label);
      prevParams.set("salary", salary);

      return prevParams;
    });
    // navigate(`/jobs?search=${query}&industry=${industry}&location=${location}`);
  };
  // useEffect(() => {
  //   if (searchValue || industryValue || locationValue) {
  //     console.log("searchValues ", searchValue);
  //     console.log("searched query is true search query should be visible");
  //     const filteredJobs = allJobs.filter((job) => {
  //       return (
  //         job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         job.description.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         job.location.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         job.title.toLowerCase().includes(industryValue.toLowerCase()) ||
  //         job.description.toLowerCase().includes(industryValue.toLowerCase()) ||
  //         job.location.toLowerCase().includes(industryValue.toLowerCase()) ||
  //         job.title.toLowerCase().includes(locationValue.toLowerCase()) ||
  //         job.description.toLowerCase().includes(locationValue.toLowerCase()) ||
  //         job.location.toLowerCase().includes(locationValue.toLowerCase())
  //       );
  //     });
  //     setFilterJobs(filteredJobs);
  //   } else {
  //     setFilterJobs(allJobs);
  //   }
  // }, [allJobs, searchValue]);

  useEffect(() => {
    // Trim values to handle whitespace-only inputs
    const trimmedSearchValue = searchValue
      ? searchValue.trim().toLowerCase()
      : "";
    // const trimmedIndustryValue = industryValue
    //   ? industryValue.trim().toLowerCase()
    //   : "";
    // const trimmedLocationValue = locationValue
    //   ? locationValue.trim().toLowerCase()
    //   : "";
    // const trimmedkeywordValue = keywordValue
    //   ? keywordValue.trim().toLowerCase()
    //   : "";
    const trimmedCategoryValue = categoryValue
      ? categoryValue.trim().toLowerCase()
      : "";
    const trimmedTypeValue = typeValue ? typeValue.trim().toLowerCase() : "";

    const trimmedLabelValue = labelValue ? labelValue.trim().toLowerCase() : "";
    const trimmedExperienceValue = experienceValue
      ? experienceValue.trim().toLowerCase()
      : "";
    const trimmedSalaryValue = salaryValue
      ? salaryValue.trim().toLowerCase()
      : "";

    // Check if any filter criteria are provided
    console.log("salary is ", salaryValue);
    console.log("experience is ", experienceValue);
    if (
      // trimmedIndustryValue ||
      // trimmedLocationValue ||
      // trimmedkeywordValue ||
      trimmedSalaryValue ||
      trimmedSearchValue ||
      trimmedCategoryValue ||
      trimmedTypeValue ||
      trimmedLabelValue ||
      trimmedExperienceValue

      // trimmedPositionValue ||
      // trimmedOnsiteRemoteValue ||
      // trimmedJobTypeValue
    ) {
      console.log("searchValues ", trimmedSearchValue);

      const filteredJobs = allJobs.filter((job) => {
        const jobTitle = job.title.toLowerCase();
        const jobDescription = job.description.toLowerCase();
        const jobLocation = job.location.toLowerCase();
        const jobExperience = job.experienceLevel;
        const jobSalary = String(job.salary).toLowerCase();

        // Individual filter conditions
        const matchesSearch = trimmedSearchValue
          ? jobTitle.includes(trimmedSearchValue) ||
            jobDescription.includes(trimmedSearchValue) ||
            jobLocation.includes(trimmedSearchValue)
          : false; // If searchValue is empty, this condition is false

        const matchesCategory = trimmedCategoryValue
          ? jobTitle.includes(trimmedCategoryValue) ||
            jobDescription.includes(trimmedCategoryValue) ||
            jobLocation.includes(trimmedCategoryValue)
          : false; // If industryValue is empty, this condition is false

        const matchesType = trimmedTypeValue
          ? jobTitle.includes(trimmedTypeValue) ||
            jobDescription.includes(trimmedTypeValue)
          : // jobLocation.includes(trimmedLocationValue)
            false; // If locationValue is empty, this condition is false

        const matchesLabel = trimmedLabelValue
          ? jobTitle.includes(trimmedLabelValue) ||
            jobDescription.includes(trimmedLabelValue)
          : // jobLocation.includes(trimmedkeywordValue) // Or remove jobLocation if keyword doesn't apply there
            false;
        const matchesSalary = trimmedSalaryValue
          ? jobSalary.includes(trimmedSalaryValue) // Simple string match
          : false;

        const matchesExperience = trimmedExperienceValue
          ? // jobExperience.includes(trimmedExperienceValue) ||
            jobTitle.includes(trimmedExperienceValue) ||
            jobDescription.includes(trimmedExperienceValue)
          : // Simple string match
            false;
        // const matchesPosition = trimmedPositionValue
        //   ? jobTitle.includes(trimmedPositionValue) ||
        //     jobDescription.includes(trimmedPositionValue) ||
        //     jobLocation.includes(trimmedPositionValue) // Or remove jobLocation if keyword doesn't apply there
        //   : false;
        // const matchesOnsiteRemote = trimmedOnsiteRemoteValue
        //   ? jobTitle.includes(trimmedOnsiteRemoteValue) ||
        //     jobDescription.includes(trimmedOnsiteRemoteValue) ||
        //     jobLocation.includes(trimmedOnsiteRemoteValue) // Or remove jobLocation if keyword doesn't apply there
        //   : false;
        // const matchesJobType = trimmedJobTypeValue
        //   ? jobTitle.includes(trimmedJobTypeValue) ||
        //     jobDescription.includes(trimmedJobTypeValue) ||
        //     jobLocation.includes(trimmedJobTypeValue) // Or remove jobLocation if keyword doesn't apply there
        //   : false;

        // Combine conditions:
        // If ANY value is present, return true if it matches its respective filter.
        // This setup still uses OR logic across the different input fields (search, industry, location).
        // If you want jobs to match ALL filled-in criteria (e.g., search AND industry),
        // you'll need to adjust this combining logic.
        return (
          matchesSearch ||
          matchesLabel ||
          matchesType ||
          matchesExperience ||
          matchesSalary ||
          matchesCategory
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      // If no search criteria are provided, show all jobs
      setFilterJobs(allJobs);
    }
  }, [
    allJobs,
    typeValue,
    labelValue,
    experienceValue,
    categoryValue,
    searchValue,
    salaryValue,
  ]); // Add industryValue and locationValue to dependencies
  return (
    <>
      <div className="bg-[#F5F6FD]">
        <Navbar />
        <Container className={"bg-[#F5F6FD]"}>
          {/* <div className="grid grid-cols-4 md:grid-cols-8 my-[40px] xl:grid-cols-12 gap-[16px] p-[12px] bg-[#FEFEFF]"> */}
          <div className="grid grid-cols-4 md:grid-cols-8 my-[40px]  xl:flex items-center gap-[16px] p-[12px] bg-[#FEFEFF]">
            <Select
              // value={categoryValue}
              defaultValue={categoryValue}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger className="bg-[#F5F6FD] xl:w-[50%] border-none hidden xl:flex py-[12px] px-[14px]">
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

            <Select
              // value={typeValue}
              defaultValue={typeValue}
              onValueChange={(value) => setType(value)}
            >
              <SelectTrigger className="bg-[#F5F6FD] xl:w-[50%] border-none hidden xl:flex py-[12px] px-[14px]">
                <SelectValue placeholder={JobType.name} />
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
            <Select
              // value={labelValue}
              defaultValue={labelValue}
              onValueChange={(value) => setLabel(value)}
            >
              <SelectTrigger className="bg-[#F5F6FD] xl:w-[50%] border-none hidden xl:flex py-[12px] px-[14px]">
                <SelectValue placeholder={JobLabel.name} />
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
            <Input
              type="text"
              placeholder="Search Job Keywords.."
              onChange={(e) => setQuery(e.target.value)}
              defaultValue={searchValue}
              className="py-[12px]  px-[14px] col-span-2 md:col-span-4 border-none bg-[#F5F6FD]"
              // className="p-[20px] "
            />
            <Select
              // value={experienceValue}
              defaultValue={experienceValue}
              onValueChange={(value) => setExperience(value)}
            >
              <SelectTrigger className="py-[12px] xl:w-[50%] px-[14px]  hidden md:flex  border-none bg-[#F5F6FD]">
                <SelectValue placeholder={Experience.name} />
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

            <Select
              // value={salaryValue}
              defaultValue={salaryValue}
              onValueChange={(value) => setSalary(value)}
            >
              <SelectTrigger className="py-[12px] xl:w-[50%] px-[14px]  hidden md:flex xl:col-span-2 border-none bg-[#F5F6FD]">
                <SelectValue placeholder={Salary.name} />
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

            {/* {["Category", "Job Type", "Job Label"].map((item) => (
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="bg-[#F5F6FD] xl:w-[50%] border-none hidden xl:flex py-[12px] px-[14px]">
                  <SelectValue placeholder={item} />
                </SelectTrigger>
                <SelectContent>
                  {filter1.array.map((item, idx) => (
                    <>
                      <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                        <SelectItem value={item}>{item}</SelectItem>
                      </div>
                    </>
                  ))}
                </SelectContent>
              </Select>
            ))}

            <Input
              type="text"
              placeholder="Search Job Keywords.."
              className="py-[12px]  px-[14px] col-span-2 md:col-span-4 border-none bg-[#F5F6FD]"
            />

            {["Experience", "Sallary"].map((item) => (
              <Select onValueChange={(value) => setIndustry(value)}>
                <SelectTrigger className="py-[12px] xl:w-[50%] px-[14px]  hidden md:flex xl:col-span-2 border-none bg-[#F5F6FD]">
                  <SelectValue placeholder={item} />
                </SelectTrigger>
                <SelectContent>
                  {filter1.array.map((item, idx) => (
                    <>
                      <div
                        className="flex items-center justify-between my-2 
                      text-[#35373F]"
                      >
                        <SelectItem value={item}>{item}</SelectItem>
                      </div>
                    </>
                  ))}
                </SelectContent>
              </Select>
            ))}

            <Select onValueChange={(value) => setIndustry(value)}>
              <SelectTrigger className="bg-[#F5F6FD] border-none xl:hidden py-[12px] px-[14px]">
                <SelectValue placeholder="More" />
              </SelectTrigger>
              <SelectContent>
                {filter1.array.map((item, idx) => (
                  <>
                    <div className="flex items-center justify-between my-2 text-sm font-normal text-gray-500 ">
                      <SelectItem value={item}>{item}</SelectItem>
                    </div>
                  </>
                ))}
              </SelectContent>
            </Select> */}
            <SlidersHorizontal className="xl:hidden" />
            <button
              onClick={searchJobHandler}
              className=" bg-[#E8C092] hover:bg-[#ceab83] text-[#03050F] px-[14px] h-[42px] rounded-[4px] text-[14px]"
            >
              Apply
            </button>
          </div>
          {/* </div> */}
          <div className="mb-[100px]">
            {filterJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              // <div className="flex-1 bg-green-900 h-[88vh] overflow-y-auto pb-5 ">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[16px] ">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
              // </div>
            )}
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Jobs;
