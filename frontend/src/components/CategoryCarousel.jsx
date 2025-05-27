import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="mx-auto max-w-xl my-20">
        <CarouselContent className="mx-auto">
          {category.map((cat, index) => (
            <CarouselItem className="md-basis-1/2 lg:basis-1/3">
              <Button variant="outline" className="rounded-full">
                {cat}
              </Button>
            </CarouselItem> 
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
