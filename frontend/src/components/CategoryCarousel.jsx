import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { BookOpenText, Home } from "lucide-react";
// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";

const category = [
  {
    name: "Marketing & Sale",
    desc: "138 job availabe",
  },
  {
    name: "Customer Service",
    desc: "120 job availabe",
  },
  {
    name: "Finance",
    desc: "120 job availabe",
  },
  {
    name: "Content Writer",
    desc: "120 job availabe",
  },
  {
    name: "Finance",
    desc: "120 job availabe",
  },
  {
    name: "Retail & Products",
    desc: "120 job availabe",
  },
  {
    name: "Human Recourses",
    desc: "120 job availabe",
  },
  {
    name: "Ux/Ui Design",

    desc: "120 job availabe",
  },
  {
    name: "Security Analyst",
    desc: "120 job availabe",
  },
  {
    name: "Human Recourses",
    desc: "120 job availabe",
  },
  {
    name: "Management",
    desc: "120 job availabe",
  },
  {
    name: "Software Engineer",
    desc: "120 job availabe",
  },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const searchJobHandler = (query) => {
  //   dispatch(setSearchedQuery(query));
  //   navigate("/browse");
  // };

  return (
    <>
      <div className="mx-auto flex flex-col items-center gap-5   w-[90%] md:w-[80%] my-10 ">
        <Swiper
          breakpoints={{
            500: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            // 700:{
            //   slidesPerView: 3,
            //   spaceBetween: 5,
            // },
            1000: {
              slidesPerView: 3,
              spaceBetween: 3,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 3,
            },
          }}
          slidesPerView={1}
          spaceBetween={5}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper  w-[90%] md:w-[80%]"
        >
          {category.map((cat, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => {
                  navigate(`/jobs?search=${cat.name}`);
                }}
                className="flex items-center rounded-md p-3 gap-3 border shadow-md bg-white border-gray-200 mb-10"
              >
                <BookOpenText
                  size={40}
                  strokeWidth="1"
                  className="text-blue-900"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-[14px]"> {cat.name}</p>
                  <span className="text-xs text-gray-500">{cat.desc}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CategoryCarousel;
