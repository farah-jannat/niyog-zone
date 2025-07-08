import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown, Home, MapPin, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Select, Separator } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const populerSearches = ["Designer", "Mid", "Developer", "Senior Developer"];

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

const HeroSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get a specific query parameter
  const category = searchParams.get("category");
  const page = searchParams.get("page");

  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [label, setLabel] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    console.log("the que is = ", query);
    // navigate("/jobs");
    navigate(`/jobs?search=${query}&industry=${industry}&location=${location}`);

    // console.log("hello");
    // dispatch(setSearchedQuery(query));
  };

  return (
    <div className="text-center w-[70%] mx-auto md:w-[80%] text-white  mt-10">
      <div className="flex flex-col gap-5 ">
        <h1 className=" text-3xl md:text-4xl font-bold">
          The #1 Job Board for Hiring <br />
          or Find Your next Job
        </h1>
        <p className="text-text_white">
          Each month more than 3 million job seekers turn to website in their
          search for <br /> work, making over 140,000 applications every single
          day
        </p>
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
                      {/* <Label
                          // onClick={() => navigate(`/jobs?search=${item}`)}
                          className="text-sm font-normal text-gray-500 cursor-pointer hover:text-gray-900"
                        >
                          {item}
                        </Label>

                        <span className="bg-light_purple rounded-md py-1 px-1 font-bold text-blue-900 text-[10px]">
                          29
                        </span> */}
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
    </div>
  );
};

export default HeroSection;
