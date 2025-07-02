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
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <div className="text-center mt-20 ">
        {/* <h2 className="text-2xl font-semibold">Browse Jobs Category</h2>
        <h1 className="text-xs text-gray-500 mt-2">
          Find the Jobs thats perfect for you, about 800+ new jobs everyday
        </h1> */}
      </div>
      <div className="mx-auto flex flex-col items-center gap-5   w-[70%] md:w-[80%] my-10">
        <Carousel className="w-full">
          <CarouselContent >
            {category.map((cat, index) => (
              <CarouselItem className="hidden  sm:block basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div
                  onClick={() => searchJobHandler(cat)}
                  className="flex items-center rounded-md p-3  gap-3 border shadow-md bg-White border-gray-200 "
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
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="bg-blue-100 text-blue-900" />
        <CarouselNext className="bg-blue-100 text-blue-900" /> */}
        </Carousel>
        <div className="hidden sm:flex items-center gap-2">
          <div className="h-[6px] w-[6px] bg-blue-200 rounded-full"></div>
          <div className="h-[10px] w-[10px] bg-White rounded-full"></div>
          <div className="h-[6px] w-[6px] bg-blue-200 rounded-full"></div>
          <div className="h-[6px] w-[6px] bg-blue-200 rounded-full"></div>
          <div className="h-[6px] w-[6px] bg-blue-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
