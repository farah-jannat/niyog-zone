"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { jobLimit } from "@/constants";

const useJobFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // pagination query
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || jobLimit, 10);

  //   category: "",
  //   jobType: "",
  //   jobLevel: "",
  //   experience: "",
  //   salary: "",
  //   keywords: "",

  // query params

  const category = searchParams.get("category") || "";
  const jobType = searchParams.get("jobType") || "";
  const jobLevel = searchParams.get("jobLevel") || "";
  const experience = searchParams.get("experience") || "";
  const salary = searchParams.get("salary") || "";
  const keywords = searchParams.get("keywords") || "";

  // const industry = searchParams.get("industry") || "";
  // const location = searchParams.get("location") || "";
  // const experience = searchParams.get("experience") || "";

  // State to manage form inputs
  const [filters, setFilters] = useState({
    category: category,
    jobType: jobType,
    jobLevel: jobLevel,
    experience: experience,
    salary: salary,
    keywords: keywords,
  });

  // Keep local state in sync with URL params
  useEffect(() => {
    setFilters({
      category: category,
      jobType: jobType,
      jobLevel: jobLevel,
      experience: experience,
      salary: salary,
      keywords: keywords,
    });
  }, [category, jobType, jobLevel, experience, salary, keywords]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();

    // pagination
    newParams.set("page", "1");
    newParams.set("limit", limit.toString());

    // filters
    if (filters.category) newParams.set("category", filters.category);
    if (filters.jobType) newParams.set("jobType", filters.jobType);
    if (filters.jobLevel) newParams.set("jobLevel", filters.jobLevel);
    if (filters.experience) newParams.set("experience", filters.experience);
    if (filters.salary) newParams.set("salary", filters.salary);
    if (filters.keywords) newParams.set("keywords", filters.keywords);

    router.push(`?${newParams.toString()}`);
  };

  const clearFilters = () => {
    router.push("?");
  };

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", page.toString());
    router.push(`?${currentParams.toString()}`);
  };

  const baseQueryString = `category=${encodeURIComponent(
    category
  )}&jobType=${encodeURIComponent(jobType)}&jobLevel=${encodeURIComponent(
    jobLevel
  )}&experience=${encodeURIComponent(experience)}&salary=${encodeURIComponent(
    salary
  )}&keywords=${encodeURIComponent(keywords)}`;

  return {
    filters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    handlePageChange,
    currentPage,
    limit,
    baseQueryString,
  };
};

export default useJobFilter;
