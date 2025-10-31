"use client";
import Container from "@/components/container";
import HeroSection from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Footer from "@/components/widgets/footer";
import JobList from "@/features/job/components/job-list";
import { useLatestJobsQuery } from "@/features/job/queries/use-latest-jobs.query";

export default function Page() {
  const { isLoading, data, error } = useLatestJobsQuery({
    page: 1,
    limit: 6,
  });

  return (
    <div className="bg-[#F5F6FD] ">
      <Container className={"bg-gradient"}>
        <HeroSection />
      </Container>

      <Container>
        <JobList
          subHeading="Top Jobs You Can Apply Right Now"
          heading="Latest Jobs"
          isLoading={isLoading}
          error={error}
          jobs={data?.jobs}
        />
      </Container>

      <Container className={"bg-[#FBFBFE]"}>
        <HowItWorks />
      </Container>

      <Footer />
    </div>
  );
}
