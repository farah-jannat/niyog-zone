import React, { useEffect, useState } from "react";

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

const filter1 = {
  name: "Industry",
  icon: "Home",
  array: [
    "All",
    "Software",
    "mid",
    "Finance",
    "Marketing",
    "Management",
    "Design",
  ],
};

const filter2 = {
  name: "location",
  icon: "MapPin",
  array: ["All", "Dhaka", "Florida", "Bonani"],
};

const Jobs = () => {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  const { allJobs } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("search");
  const industryValue = searchParams.get("industry");
  const locationValue = searchParams.get("location");
  const keywordValue = searchParams.get("keyword");
  const salaryValue = searchParams.get("salary");
  const positionValue = searchParams.get("position");
  const onsiteRemoteValue = searchParams.get("onsiteRemote");
  const jobTypeValue = searchParams.get("jobType");
  console.log("position", positionValue);

  const dispatch = useDispatch();

  const searchJobHandler = () => {
    console.log("value is here", searchValue);
    dispatch(setSearchedQuery(query));
    setSearchParams((prevParams) => {
      prevParams.set("search", query);
      prevParams.set("industry", industry);
      prevParams.set("location", location);
      prevParams.set("keyword");
      prevParams.set("salary");

      return prevParams;
    });
    console.log("salary", salary);
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
    const trimmedIndustryValue = industryValue
      ? industryValue.trim().toLowerCase()
      : "";
    const trimmedLocationValue = locationValue
      ? locationValue.trim().toLowerCase()
      : "";
    const trimmedkeywordValue = keywordValue
      ? keywordValue.trim().toLowerCase()
      : "";
    const trimmedSalaryValue = salaryValue
      ? salaryValue.trim().toLowerCase()
      : "";

    const trimmedPositionValue = positionValue
      ? positionValue.trim().toLowerCase()
      : "";
    const trimmedOnsiteRemoteValue = onsiteRemoteValue
      ? onsiteRemoteValue.trim().toLowerCase()
      : "";
    const trimmedJobTypeValue = jobTypeValue
      ? jobTypeValue.trim().toLowerCase()
      : "";

    // Check if any filter criteria are provided
    console.log("salary is ", salaryValue);
    if (
      trimmedSearchValue ||
      trimmedIndustryValue ||
      trimmedLocationValue ||
      trimmedkeywordValue ||
      trimmedSalaryValue ||
      trimmedPositionValue ||
      trimmedOnsiteRemoteValue ||
      trimmedJobTypeValue
    ) {
      console.log("searchValues ", trimmedSearchValue);
      console.log("searched query is true search query should be visible");

      const filteredJobs = allJobs.filter((job) => {
        const jobTitle = job.title.toLowerCase();
        const jobDescription = job.description.toLowerCase();
        const jobLocation = job.location.toLowerCase();
        const jobSalary = String(job.salary).toLowerCase();

        // Individual filter conditions
        const matchesSearch = trimmedSearchValue
          ? jobTitle.includes(trimmedSearchValue) ||
            jobDescription.includes(trimmedSearchValue) ||
            jobLocation.includes(trimmedSearchValue)
          : false; // If searchValue is empty, this condition is false

        const matchesIndustry = trimmedIndustryValue
          ? jobTitle.includes(trimmedIndustryValue) ||
            jobDescription.includes(trimmedIndustryValue) ||
            jobLocation.includes(trimmedIndustryValue)
          : false; // If industryValue is empty, this condition is false

        const matchesLocation = trimmedLocationValue
          ? jobTitle.includes(trimmedLocationValue) ||
            jobDescription.includes(trimmedLocationValue) ||
            jobLocation.includes(trimmedLocationValue)
          : false; // If locationValue is empty, this condition is false

        const matchesKeyword = trimmedkeywordValue
          ? jobTitle.includes(trimmedkeywordValue) ||
            jobDescription.includes(trimmedkeywordValue) ||
            jobLocation.includes(trimmedkeywordValue) // Or remove jobLocation if keyword doesn't apply there
          : false;
        const matchesSalary = trimmedSalaryValue
          ? jobSalary.includes(trimmedSalaryValue) // Simple string match
          : false;
        const matchesPosition = trimmedPositionValue
          ? jobTitle.includes(trimmedPositionValue) ||
            jobDescription.includes(trimmedPositionValue) ||
            jobLocation.includes(trimmedPositionValue) // Or remove jobLocation if keyword doesn't apply there
          : false;
        const matchesOnsiteRemote = trimmedOnsiteRemoteValue
          ? jobTitle.includes(trimmedOnsiteRemoteValue) ||
            jobDescription.includes(trimmedOnsiteRemoteValue) ||
            jobLocation.includes(trimmedOnsiteRemoteValue) // Or remove jobLocation if keyword doesn't apply there
          : false;
        const matchesJobType = trimmedJobTypeValue
          ? jobTitle.includes(trimmedJobTypeValue) ||
            jobDescription.includes(trimmedJobTypeValue) ||
            jobLocation.includes(trimmedJobTypeValue) // Or remove jobLocation if keyword doesn't apply there
          : false;

        // Combine conditions:
        // If ANY value is present, return true if it matches its respective filter.
        // This setup still uses OR logic across the different input fields (search, industry, location).
        // If you want jobs to match ALL filled-in criteria (e.g., search AND industry),
        // you'll need to adjust this combining logic.
        return (
          matchesSearch ||
          matchesIndustry ||
          matchesLocation ||
          matchesKeyword ||
          matchesSalary ||
          matchesPosition ||
          matchesOnsiteRemote ||
          matchesJobType
        );
      });

      setFilterJobs(filteredJobs);
    } else {
      // If no search criteria are provided, show all jobs
      setFilterJobs(allJobs);
    }
  }, [
    allJobs,
    searchValue,
    industryValue,
    locationValue,
    keywordValue,
    salaryValue,
    positionValue,
    onsiteRemoteValue,
    jobTypeValue,
  ]); // Add industryValue and locationValue to dependencies
  return (
    <>
      <div className="bg-[#F5F6FD]">
        <Navbar />
        <Container className={"bg-[#F5F6FD]"}>
          <div className="grid grid-cols-4 md:grid-cols-8 my-[40px] xl:grid-cols-12 gap-[16px] p-[12px] bg-[#FEFEFF]">
            {["Category", "Job Type", "Job Label"].map((item) => (
              <Select onValueChange={(value) => setIndustry(value)}>
                <SelectTrigger className="bg-[#F5F6FD] border-none hidden xl:flex py-[12px] px-[14px]">
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
              className="py-[12px] px-[14px] col-span-2 md:col-span-4 border-none bg-[#F5F6FD]"
            />

            {["Experience", "Expected Sallary"].map((item) => (
              <Select onValueChange={(value) => setIndustry(value)}>
                <SelectTrigger className="py-[12px] px-[14px]  hidden md:flex xl:col-span-2 border-none bg-[#F5F6FD]">
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
            </Select>
            <button className=" bg-[#E8C092] text-[#03050F] px-[14px] h-[42px] rounded-[4px] text-[14px]">
              Reset
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
