"use client"

import JobFilter from "@/features/job/components/job-filter";
import useJobFilter from "@/features/job/hooks/use-job-filter";
import React from "react";

const HeroSection = () => {
  const { filters, handleFilterChange, applyFilters, clearFilters } =
    useJobFilter();

  return (
    <div className="pt-12 pb-16">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-[28px] sm:text-[48px] lg:text-[88px] text-[#03050F] font-bold leading-24">
          Your <span className="text-[#A1DD5F]">Next</span> Career Awaits
        </h1>
        <p className="text-[#03050F] font-normal text-[16px] tracking-[0.64] max-w-[315px] leading-[24.95px]">
          Explore job opportunities at the world's most innovative companies{" "}
        </p>
      </div>

      <div className="mt-[68px] min-h-[344px] grid gap-6 lg:grid-cols-12 grid-row-2">
        {/* 1st box */}
        <JobFilter
          className="col-span-6 rounded-sm row-span-2"
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />

        {/* 2nd box */}
        <ShowCounts
          total={10}
          title="Active Jobs"
          className="col-span-3 row-span-1  rounded-sm "
        />

        {/* 3rd box */}
        <ShowCounts
          total={1200}
          title="Startups"
          className="col-span-3 row-span-1  rounded-sm "
        />

        {/* 4th box */}
        <ShowCounts
          total={300}
          title="Talents"
          className="col-span-6 row-span-1 rounded-sm "
        />
      </div>
    </div>
  );
};

const ShowCounts = (props: {
  total: number;
  className: string;
  title: string;
}) => {
  const { total, className, title } = props;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 card-gradient-brown rounded-xl min-h-[138px] ${className}`}
    >
      <h1 className="font-bold text-[32px] text-Black">
        {total}
        <span className="text-Apple_Green">M</span>
      </h1>
      <p>{title}</p>
    </div>
  );
};

export default HeroSection;
