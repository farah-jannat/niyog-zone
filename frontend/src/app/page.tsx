"use client";
import Container from "@/components/container";
import HeroSection from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import JobList from "@/features/job/components/job-list";
import { useLatestJobsQuery } from "@/features/job/queries/use-latest-jobs.query";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <Home />
    </Suspense>
  );
}

function Home() {
  const { isLoading, data, error } = useLatestJobsQuery({
    page: 1,
    limit: 6,
  });

  return (
    <>
      <Container className={"bg-gradient"}>
        <HeroSection />
      </Container>

      <Container className="bg-[#F5F6FD] pt-12 pb-16">
        <JobList
          subHeading="Top Jobs You Can Apply Right Now"
          heading="Latest Jobs"
          isLoading={isLoading}
          error={error}
          jobs={data?.jobs}
        />
      </Container>

      <Container className={"bg-[#FBFBFE] pt-12 pb-16"}>
        <HowItWorks />
      </Container>
    </>
  );
}
