"use client";

import Container from "@/components/container";
import CompanyBio from "@/features/company/components/company-bio";
import { useCompanyQuery } from "@/features/company/queries/use-company.query";
import JobList from "@/features/job/components/job-list";
import { useCompanyJobsQuery } from "@/features/job/queries/use-company-jobs.query";
import { useParams } from "next/navigation";

const CompanyDetails = () => {
  const { id } = useParams<{ id: string }>();

  // ** --- Queires ---

  const { isLoading: isCompanyLoading, data: company } = useCompanyQuery(id);
  const { isLoading: isCompanyJobLoading, data } = useCompanyJobsQuery({
    id: id,
    q: "",
    page: 1,
    limit: 6,
  });

  if (isCompanyLoading) return null;

  console.log("data is ", data);
  console.log("company is ", company);

  return (
    <div>
      <Container className="bg-[#F5F6FD] pt-20">
        <CompanyBio company={company} />
      </Container>

      <Container className="bg-[#F5F6FD] py-[52px]">
        <JobList
          subHeading="This company’s"
          heading="All Jobs"
          isLoading={isCompanyJobLoading}
          jobs={data?.jobs}
        />
      </Container>
    </div>
  );
};

export default CompanyDetails;
