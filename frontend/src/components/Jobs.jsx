import React, { useEffect, useState } from "react";

import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Navbar_two from "./shared/Navbar_two";
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

import Footer from "./shared/Footer";
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
    <div>
      <Navbar_two />
      <div className="w-[90%] md:w-[80%] mx-auto">
        <div className="flex gap-5 p-3 items-end justify-center bg-light_purple mt-5 rounded-md">
          <div className="hidden md:block w-[150px] h-[150px]">
            <img
              src="../../public/jobs-banner.png"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col gap-3 my-10">
            <h2 className="text-2xl font-semibold text-center text-Black">
              <span className="text-Blue">2200 Jobs</span> Available Now
            </h2>
            <p className="text-gray-500 text-center">
              Find the job thats prfect for you, about 800+ new jobs everyday.
              Lorem ipsum dolor, sit amet consectetur
            </p>

            {/* <div className=" bg-White shadow-md text-gray-500 rounded-md py-2 pl-5 flex items-center gap-3  mx-auto w-[full] ">
              <div className="flex flex-1 items-center gap-2 ">
                <Search size={20} />
                <Input
                  type="text"
                  placeholder="Your Keyword"
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-none w-full px-0"
                />
              </div>
              <span className="hidden md:block">|</span>
              <div className="hidden md:flex  items-center gap-2 ">
                <Home size={20} className="" />
                <span className="">Industry</span>
                <ChevronDown size={17} />
              </div>
              <span className="hidden md:block">|</span>
              <div className="hidden md:flex  items-center gap-2 ">
                <MapPin size={20} className="" />
                <span>location</span>
                <ChevronDown size={17} />
              </div>
              <Button onClick={searchJobHandler} className="rounded-md bg-Blue">
                search
              </Button>
            </div> */}
            <div className="bg-White border border-gray-200 text-gray-500 rounded-md py-2 pl-5 flex items-center gap-3 shadow-lg  mx-auto w-[full] ">
              <div className="flex flex-1 items-center gap-2 ">
                <Search size={20} />
                <Input
                  type="text"
                  placeholder="Your Keyword"
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-none w-full px-0"
                />
              </div>
              {/* <span className="hidden md:block">|</span> */}

              {/* Industry */}
              <div className="hidden md:block">
                <Select onValueChange={(value) => setIndustry(value)}>
                  <SelectTrigger className="w-[180px]">
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
              {/* filter 2 */}
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
          </div>
          <div className="hidden md:block w-[150px]">
            <img
              src="../../public/jobs-banner.png"
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>

        {/* filter  */}
        <div className="flex flex-col lg:flex-row gap-20 mt-10">
          <div className="hidden lg:block">
            <FilterCard />
          </div>

          {/* <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 text-Black my-10"> */}

          {/* </div> */}

          {/* show cards  */}
          <div className="flex-1 ">
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  {/* <Button> open </Button> */}
                  <div className="lg:hidden flex items-center justify-center gap-3 w-[200px] border border-blue-150 rounded-md px-3 py-2 text-Blue mx-auto ">
                    <button className="text-sm font-semibold">
                      Advanced Filter
                    </button>
                    <AlignLeft className="text-Blue" />
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="bg-White shadow-lg p-10">
                    <FilterCard_two />
                  </div>
                </PopoverContent>
              </Popover>

              <div className="hidden sm:flex flex-1  justify-between items-center border-b pb-2">
                <span className="text-sm text-gray-500">
                  Showing 41-60 of 680 jobs
                </span>
                <div className="flex gap-2">
                  <button className="flex gap-2 items-center border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-500">
                    Show 12 <ChevronDown size={16} />
                  </button>
                  <button className="flex gap-2 items-center border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-500">
                    Sort by Newest <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              {filterJobs.length <= 0 ? (
                <span>Job not found</span>
              ) : (
                // <div className="flex-1 bg-green-900 h-[88vh] overflow-y-auto pb-5 ">
                <div className="flex  items-center justify-center  gap-3 flex-wrap ">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
