"use client";

import Container from "@/components/container";
import { jobMenus } from "@/constants";
import JobCompany from "@/features/job/components/job-company";
import JobDescription from "@/features/job/components/job-descrption";
import JobDetailsTab from "@/features/job/components/job-details-tab";
import JobList from "@/features/job/components/job-list";
import JobTagList from "@/features/job/components/job-tag-list";
import SimilarJobList from "@/features/job/components/similar-job-list";
import { useJobQuery } from "@/features/job/queries/use-job.query";
import { useSimilarJobsQuery } from "@/features/job/queries/use-similar-jobs.query";
import useTabs from "@/hooks/useTabs";
import { formatDistanceToNow } from "date-fns";
import { TimerResetIcon, Users } from "lucide-react";
import { useParams } from "next/navigation";

const job = {
  id: "12c7c781-5c19-49fc-88c6-f3f2d13aded3",
  title: "Principal Mobility Liaison",
  category: "Construction and Infrastructure",
  description:
    "Arca sufficio vulgaris vociferor texo. Defendo sponte aestivus accedo templum benigne virga facilis sollers. Vorax vicissitudo acies conor adficio ante aurum.\nEst caste ara agnosco non sono talis auditor. Venio consequuntur atqui cur nesciunt triumphus adstringo asperiores tempora spero. Acceptus tenus nobis coaegresco acerbitas assentator vel ubi.",
  requirements: [
    "Bachelor's degree in Computer Science or related field.",
    "Proficiency in SQL and relational databases.",
  ],
  salary: 78040,
  experience: "5",
  location: "Arden-Arcade",
  jobType: "Contract",
  jobLevel: "Mid",
  vacancy: 5,
  companyId: "65eee4d6-0c83-4943-be7b-32f318604060",
  createdBy: "c3c941f7-087f-4a60-8b63-39d6c8acf37d",
  createdAt: "2025-10-30T14:43:16.969Z",
  updatedAt: "2025-10-30T14:43:16.969Z",
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: jobMenus,
  });

  // ** --- Queries ---

  const { isLoading, data: job, error } = useJobQuery(id);

  // console.log("data is ", job?.category);

  const {
    isLoading: isSimilarLoading,
    data: similarJobs,
    error: similarError,
  } = useSimilarJobsQuery({
    category: job?.category,
    q: "",
    page: 1,
    limit: 6,
  });

  if (isLoading) return null;

  // return (<div>hello</div>)

  return (
    <div className="bg-[#F5F6FD]">
      <Container>
        <div className="flex flex-col min-h-[292px] gap-[26px] text-[#03050F] items-center justify-center card-gradient-bluish rounded-bl-[8px] rounded-br-[8px] text-[16px]">
          <h2 className="text-[#35373F] text-[40px] font-bold">{job?.title}</h2>
          <div className="flex items-center gap-5">
            <div className=" flex items-center gap-2">
              <Users size={24} /> {job?.vacancy} vacancy
            </div>
            <div className="col-span-6 flex items-center gap-2">
              <TimerResetIcon size={24} />
              <span>Posted {formatDistanceToNow(job?.createdAt)} ago</span>
            </div>
          </div>

          {/* {user && (
          <Button
            onClick={isApplied ? null : applyJobHandler}
            className={`rounded-md px-4 py-2   text-[#03050F] ${
              isApplied
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-[#E8C092] hover:bg-[#cfac83]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now "}
          </Button>
        )} */}

          {/* {!user && (
          <Button
            onClick={() => navigate("/login")}
            className={`rounded-md px-4 py-2   text-[#03050F] ${
              isApplied
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-[#E8C092] hover:bg-[#cfac83]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now "}
          </Button>
        )} */}
        </div>
      </Container>

      <Container>
        <JobTagList job={job} />
      </Container>

      <Container className="pt-7">
        <JobDetailsTab
          currentTabIndex={currentTabIndex}
          handleTabIndex={handleTabIndex}
          tabs={tabs}
        />
      </Container>

      <Container className="pt-7">
        {currentTabIndex === 0 && (
          <JobDescription description={job?.description} />
        )}
        {currentTabIndex === 1 && <JobCompany />}
      </Container>

      {/* <Container>
        <SimilarJobList />
      </Container> */}

      <Container>
        <JobList
          subHeading="Similar Jobs You Can Apply Right Now"
          heading="Similar Jobs"
          isLoading={isSimilarLoading}
          error={similarError}
          jobs={similarJobs?.jobs}
        />
      </Container>
    </div>
  );
};

export default JobDetails;
