import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronDown, Home, MapPin, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center w-[70%] mx-auto md:w-[90%]">
      <div className="flex flex-col gap-5 my-10 ">
        <span className="hidden md:block bg-gray-100 text-blue-900 px-4 mx-auto rounded-full py-2 font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className=" text-3xl md:text-5xl font-bold">
          Search, Apply & <br />
          Get Your
          <span className="text-blue-900"> Dream Jobs</span>
        </h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
          distinctio voluptate! Enim, sint culpa!
        </p>
        <div className=" border border-gray-200 text-gray-500 rounded-xl py-2 pl-5 flex items-center gap-3 shadow-lg  mx-auto w-[full] ">
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
          <Button
            onClick={searchJobHandler}
            className="rounded-r-xl h-auto bg-button_blue"
          >
            search
          </Button>
        </div>
        <p className="text-gray-500 ">
          popular searches:{" "}
          <a className="hover:underline" href="#">
            Designer
          </a>{" "}
          <a className="hover:underline" href="#">
            Web{" "}
          </a>
          <a className="hover:underline" href="">
            IOS Developer
          </a>{" "}
          <a className="hover:underline" href="">
            Php
          </a>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
