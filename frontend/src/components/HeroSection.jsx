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
    <div className="text-center w-[70%] mx-auto md:w-[80%] text-white">
      <div className="flex flex-col gap-5 my-10 ">
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
        <p className="hidden sm:block text-text_white ">
          popular searches:{"   "}
          <a className="underline" href="#">
            Designer,
          </a>
          {"  "}
          <a className="underline" href="#">
            Web,{"  "}
          </a>
          <a className="underline" href="">
            IOS Developer,
          </a>
          {"  "}
          <a className="underline" href="">
            Php
          </a>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
