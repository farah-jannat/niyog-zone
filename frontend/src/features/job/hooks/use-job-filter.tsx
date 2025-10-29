"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { jobLimit } from "@/constants";
import jobSearchForm from "@/features/job/default-form-values/job-search.form";
import { useForm } from "react-hook-form";
import { JobSearchFormValues } from "@/features/job/schemas/search.schema";

export interface Filter {
  category: string;
  jobType: string;
  jobLevel: string;
  experience: string;
  salary: string;
  keywords: string;
}

const useJobFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // pagination query
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || jobLimit, 10);

  // query params

  const category = searchParams.get("category") || "";
  const jobType = searchParams.get("jobType") || "";
  const jobLevel = searchParams.get("jobLevel") || "";
  const experience = searchParams.get("experience") || "";
  const salary = searchParams.get("salary") || "";
  const keywords = searchParams.get("keywords") || "";

  const { control, register, handleSubmit, reset } =
    useForm<JobSearchFormValues>({
      defaultValues: jobSearchForm(),
      mode: "onChange",
    });

  useEffect(() => {
    const obj = {
      category,
      jobType,
      jobLevel,
      experience,
      salary,
      keywords,
    };
    reset(jobSearchForm(obj));
  }, [category, jobType, jobLevel, experience, salary, keywords, reset]);

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
    clearFilters,
    handlePageChange,
    currentPage,
    limit,
    baseQueryString,
    control,
    handleSubmit,
    register,
  };
};

export default useJobFilter;
