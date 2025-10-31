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
import { zodResolver } from "@hookform/resolvers/zod";
import FilterInput from "@/features/job/components/search-form/search-input";
import FilterSelect from "@/features/job/components/search-form/search-select";
import {
  JobSearchFormValues,
  JobSearchSchema,
} from "@/features/job/schemas/search.schema";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import jobSearchForm from "@/features/job/default-form-values/job-search.form";
import { useRouter } from "next/navigation";

interface Filter {
  searchKey: string;
  industry: string;
  location: string;
  label: string;
  category: string;
  type: string;
  experience: string;
  salary: string;
}

interface Props {
  filters: Filter;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  className?: string;
}

const JobSearchForm = (props: Props) => {
  // ** --- Props --- **

  const { applyFilters, clearFilters, filters, handleFilterChange, className } =
    props;

  const router = useRouter();

  const { control, register, handleSubmit } = useForm<JobSearchFormValues>({
    // resolver: zodResolver(JobSearchSchema),

    defaultValues: jobSearchForm(),
    // defaultValues: {
    //   category: "",
    //   jobType: "",
    //   jobLevel: "",
    //   experience: "",
    //   salary: "",
    //   keywords: "",
    // },
    mode: "onChange",
  });

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

    // console.log("Dynamically Generated Query String:", baseQueryString);

    router.push(`/jobs?${baseQueryString}`);
  };

  return (
    <form
      className={`w-full grid grid-cols-12  gap-[23px] col-span-6  row-span-2 card-gradient-bluish p-6   mx-auto lg:mx-0 ${className}`}
      // onSubmit={handleSubmit((data) => console.log("form is ", data))}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <FilterInput
        label="Keywords"
        placeholder="Search Job Keywords..."
        register={register("keywords")}
        className="col-span-12"
      />

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
        className="h-14 text-[16px] col-span-12 font-medium text-[#F5F6FD] bg-[#287992] rounded-xl cursor-pointer"
      >
        Search Result
      </button>
    </form>
  );
};

export default JobSearchForm;
