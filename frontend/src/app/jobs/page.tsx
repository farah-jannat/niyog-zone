"use client";

import useJobFilter from "@/features/job/hooks/use-job-filter";

const Jobs = () => {
  const {
    filters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    handlePageChange,
    currentPage,
    limit,
    baseQueryString,
  } = useJobFilter();

  return <div>this is jobs page</div>;
};

export default Jobs;
