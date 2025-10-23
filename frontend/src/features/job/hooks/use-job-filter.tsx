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

  // query params
  const searchKey = searchParams.get("searchKey") || "";
  const industry = searchParams.get("industry") || "";
  const location = searchParams.get("location") || "";
  const label = searchParams.get("label") || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";
  const experience = searchParams.get("experience") || "";
  const salary = searchParams.get("salary") || "";

  // State to manage form inputs
  const [filters, setFilters] = useState({
    searchKey: searchKey,
    industry: industry,
    location: location,
    label: label,
    category: category,
    type: type,
    experience: experience,
    salary: salary,
  });

  // Keep local state in sync with URL params
  useEffect(() => {
    setFilters({
      searchKey: searchKey,
      industry: industry,
      location: location,
      label: label,
      category: category,
      type: type,
      experience: experience,
      salary: salary,
    });
  }, [
    searchKey,
    industry,
    location,
    label,
    category,
    type,
    experience,
    salary,
  ]);

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
    if (filters.searchKey) newParams.set("searchKey", filters.searchKey);
    if (filters.industry) newParams.set("industry", filters.industry);
    if (filters.location) newParams.set("location", filters.location);
    if (filters.label) newParams.set("label", filters.label);
    if (filters.category) newParams.set("category", filters.category);
    if (filters.type) newParams.set("type", filters.type);
    if (filters.experience) newParams.set("experience", filters.experience);
    if (filters.salary) newParams.set("salary", filters.salary);

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

  const baseQueryString = `searchKey=${encodeURIComponent(
    searchKey
  )}&industry=${encodeURIComponent(industry)}&location=${encodeURIComponent(
    location
  )}&label=${encodeURIComponent(label)}&category=${encodeURIComponent(
    category
  )}&type=${encodeURIComponent(type)}&experience=${encodeURIComponent(
    experience
  )}&salary=${encodeURIComponent(salary)}`;

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
