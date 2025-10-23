import {
  categories,
  jobExperiences,
  jobLabels,
  jobSalaries,
  jobTypes,
} from "@/constants";
import FilterInput from "@/features/job/components/filter-form/filter-input";
import FilterSelect from "@/features/job/components/filter-form/filter-select";
import { ChangeEvent } from "react";

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

const JobFilter = (props: Props) => {
  // ** --- Props --- **

  const { applyFilters, clearFilters, filters, handleFilterChange, className } =
    props;

  return (
    <div className={className}>
      <form className="grid grid-cols-12  gap-[23px] col-span-6  row-span-2    card-gradient-bluish p-6   mx-auto lg:mx-0">
        <FilterInput
          label="Keywords"
          placeholder="Search Job Keywords..."
          handleFilterChange={handleFilterChange}
        />

        <FilterSelect
          label="Category"
          id="category"
          placeholder="Select a Category"
          options={categories}
          value={filters.category}
          handleFilterChange={handleFilterChange}
          className="col-span-1"
        />

        <FilterSelect
          label="Job Type"
          id="job-type"
          placeholder="Select job type"
          options={jobTypes}
          value={filters.type}
          handleFilterChange={handleFilterChange}
          className="col-span-1"
        />

        <FilterSelect
          label="Job Level"
          id="job-level"
          placeholder="Select job level"
          options={jobLabels}
          value={filters.label}
          handleFilterChange={handleFilterChange}
          className="col-span-1"
        />

        <FilterSelect
          label="Experience"
          id="experience"
          placeholder="Select Experience"
          options={jobExperiences}
          value={filters.experience}
          handleFilterChange={handleFilterChange}
          className="col-span-1"
        />

        <FilterSelect
          label="Salary"
          id="salary"
          placeholder="Select Salary"
          options={jobSalaries}
          value={filters.salary}
          handleFilterChange={handleFilterChange}
          className="col-span-1"
        />

        <button
          //   onClick={searchJobHandler}
          className="h-14 text-[16px] col-span-12 font-medium text-[#F5F6FD] bg-[#287992] rounded-xl"
        >
          Search Result
        </button>
      </form>
    </div>
  );
};

export default JobFilter;
