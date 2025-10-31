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
import { FunnelIcon, FunnelXIcon } from "lucide-react";

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
      className={`flex flex-wrap gap-3 items-center justify-center py-2.5 bg-[#FEFEFF] rounded-[4px] p-3`}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <FilterSelect
        label="Category"
        placeholder="Category"
        options={jobCategories}
        control={control}
        name="category"
        className="grow"
      />

      <FilterSelect
        label="Job Type"
        placeholder="Job Type"
        options={jobTypesSelect}
        control={control}
        name="jobType"
      />

      <FilterSelect
        label="Job Level"
        placeholder="Job Level"
        options={jobLevels}
        name="jobLevel"
        control={control}
      />

      <FilterInput
        label="Keywords"
        placeholder="Search"
        register={register("keywords")}
        className="grow-2"
      />

      <FilterSelect
        label="Experience"
        placeholder="Experience"
        options={jobExperiences}
        name="experience"
        control={control}
        className="grow"
      />

      <FilterSelect
        label="Salary"
        placeholder="Expected Salary"
        options={jobSalaries}
        name="salary"
        control={control}
        className="grow"
      />

      <button
        className="text-[16px] col-span-12 font-medium text-[#F5F6FD] bg-[#287992] rounded-[4px] flex items-center justify-center gap-x-0.5 px-3.5  py-3 cursor-pointer"
        type="submit"
      >
        <FunnelIcon size={18} strokeWidth={1} />
        Apply
      </button>

      <button
        className="text-[16px] col-span-12 font-medium text-[#03050F] bg-[#E8C092] rounded-[4px] flex items-center justify-center gap-x-0.5 px-3.5  py-3 cursor-pointer"
        type="button"
        onClick={clearFilters}
      >
        <FunnelXIcon size={18} strokeWidth={1} />
        Reset
      </button>

      {/*<button className="h-14 text-[16px] col-span-12 font-medium text-[#F5F6FD] bg-[#287992] rounded-">
        Clear
      </button>*/}
    </form>
  );
};

export default JobFilterForm;
