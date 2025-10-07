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
      <div className="mx-auto flex flex-col items-center gap-5   ">
        <Swiper
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            // 700:{
            //   slidesPerView: 3,
            //   spaceBetween: 5,
            // },
            768: {
              slidesPerView: 4,
              spaceBetween: 3,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 3,
            },
          }}
          slidesPerView={1}
          spaceBetween={5}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode]}
          className="mySwiper  w-full"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((cat, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => {
                  // navigate(`/jobs?search=${cat.name}`);
                }}
                className="flex items-center  "
              >
                <div className="flex flex-col items-start bg-[#FEFEFF] rounded-[4px] gap-[4px]   sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-[24px] ">
                  <p className="text-[#68696F] text-[12px]"> Experince</p>
                  <h3 className=" text-[#03050F] ">Minimum 1 year</h3>
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
