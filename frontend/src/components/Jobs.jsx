import React, { useEffect, useState } from "react";

import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Navbar_two from "./shared/Navbar_two";
import { ChevronDown, Home, MapPin, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  return (
    <div>
      <Navbar_two />
      <div className="w-[80%] mx-auto">
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

            <div className=" bg-White shadow-md text-gray-500 rounded-md py-2 pl-5 flex items-center gap-3  mx-auto w-[full] ">
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

        {/* 2nd part  */}
        {/* filter  */}
        <div className="flex flex-col lg:flex-row gap-20 mt-10  ">
          <div className="flex items-center justify-between gap-4 border-b pb-2">
            <h2 className="text-Black font-semibold">Advanced Filter</h2>
            <span className="text-sm text-gray-500">Reset</span>
          </div>

          {/* show cards  */}
          <div className="flex-1 ">
            <div className="flex justify-between items-center border-b pb-2">
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

            <div className="mt-5">
              {filterJobs.length <= 0 ? (
                <span>Job not found</span>
              ) : (
                <div className="flex-1  h-[88vh] overflow-y-auto pb-5 ">
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
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3rd part */}
        {/* <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-20% ">
            <FilterCard />
          </div>{" "}
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
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
            </div>
          )}
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default Jobs;
