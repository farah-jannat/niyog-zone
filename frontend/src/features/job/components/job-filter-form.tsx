"use client";

import {
  // categories,
  jobCategories,
  jobExperiences,
  // jobExperiences,
  jobLevels,
  jobSalaries,
  // jobSalaries,
  jobTypesSelect,
} from "@/constants";
import { JobSearchFormValues } from "@/features/job/schemas/search.schema";
import { ChangeEvent } from "react";
import {
  Control,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import jobSearchForm from "@/features/job/default-form-values/job-search.form";
import { useRouter } from "next/navigation";
import { Filter } from "@/features/job/hooks/use-job-filter";
import FilterInput from "@/features/job/components/filter-form/filter-input";
import FilterSelect from "@/features/job/components/filter-form/filter-select";

interface Props {
  control: Control<JobSearchFormValues>;
  handleSubmit: UseFormHandleSubmit<JobSearchFormValues>;
  register: UseFormRegister<JobSearchFormValues>;
  // applyFilters: () => void;
  clearFilters: () => void;
  className?: string;
}

const JobFilterForm = (props: Props) => {
  // ** --- Props --- **

  // const { applyFilters, clearFilters, filters, handleFilterChange, className } =
  // props;

  const { clearFilters, handleSubmit, className, control, register } = props;

  const router = useRouter();

  const onSubmit = (data: JobSearchFormValues) => {
    const entries = Object.entries(data);

    const baseQueryString = entries
      .filter(
        ([, value]) => value !== "" && value !== null && value !== undefined
      )
      .map(([key, value]) => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(String(value));

        return `${encodedKey}=${encodedValue}`;
      })
      .join("&");

    console.log("Dynamically Generated Query String:", baseQueryString);

    // router.push(`/jobs?${baseQueryString}`);
    router.push(`?${baseQueryString}`);

    // applyFilters();

    // console.log("hello how are you");
  };

  return (
    <form
      className={`flex flex-wrap gap-3 items-center justify-center py-2.5`}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <FilterSelect
        label="Category"
        placeholder="Select a Category"
        options={jobCategories}
        control={control}
        name="category"
        className="col-span-6"
      />

      <FilterSelect
        label="Job Type"
        placeholder="Select job type"
        options={jobTypesSelect}
        control={control}
        name="jobType"
        className="col-span-6"
      />

      <FilterSelect
        label="Job Level"
        placeholder="Select job level"
        options={jobLevels}
        name="jobLevel"
        control={control}
        className="col-span-6"
      />

      <FilterInput
        label="Keywords"
        placeholder="Search Job Keywords..."
        register={register("keywords")}
        className="col-span-12"
      />

      <FilterSelect
        label="Experience"
        placeholder="Select Experience"
        options={jobExperiences}
        name="experience"
        control={control}
        className="col-span-6"
      />

      <FilterSelect
        label="Salary"
        placeholder="Select Salary"
        options={jobSalaries}
        name="salary"
        control={control}
        className="col-span-12"
      />

      <button
        // onClick={searchJobHandler}
        className="h-14 text-[16px] col-span-12 font-medium text-[#F5F6FD] bg-[#287992] rounded-xl"
      >
        Search Result
      </button>
    </form>
  );
};

export default JobFilterForm;
