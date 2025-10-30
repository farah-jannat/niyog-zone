"use client";

import Container from "@/components/container";
import JobFilterForm from "@/features/job/components/job-filter-form";
import useJobFilter from "@/features/job/hooks/use-job-filter";
import { usePagination } from "@/hooks/use-pagination.hook";
import { useJobsQuery } from "@/features/job/queries/use-jobs.query";
import { Pagination } from "@/components/pagination";
import JobCard from "@/features/job/components/job-card";

const Jobs = () => {
  const {
    // filters,
    // handleFilterChange,
    // applyFilters,
    clearFilters,
    handlePageChange,
    currentPage,
    limit,
    baseQueryString,
    control,
    handleSubmit,
    register,
  } = useJobFilter();

  // ** --- Queries ---
  const { isLoading, data, error } = useJobsQuery({
    q: baseQueryString,
    page: currentPage,
    limit: limit,
  });

  const paginationRange = usePagination({
    currentPage,
    totalCount: data?.totalCount || 0,
    siblingCount: 1,
    pageSize: limit,
  });

  if (isLoading) return <h1>loading</h1>;
  if (error) return <h1>Error</h1>;

  // console.log("data is ", data?.jobs);

  return (
    <>
      <Container className={"bg-[#F5F6FD]"}>
        <div className="min-h-[292px] card-gradient-bluish rounded-bl-[8px] rounded-br-[8px] flex items-center justify-center">
          <h1 className="font-lato font-bold text-[56px]  text-[#35373F] text-center">
            200<span className="text-[#A1DD5F]">M</span> Jobs Available
          </h1>
        </div>
      </Container>

      <Container className={"bg-[#F5F6FD] pt-[18px]"}>
        <JobFilterForm
          handleSubmit={handleSubmit}
          control={control}
          register={register}
          clearFilters={clearFilters}
        />
      </Container>

      <Container className="pt-[18px] pb-[72px] bg-[#F5F6FD]">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data && data?.jobs?.length <= 0 && <span>No Job Available</span>}
          {data && data?.jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </Container>

      <Container className="mt-[72px]">
        <Pagination
          paginationRange={paginationRange}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
};

export default Jobs;
