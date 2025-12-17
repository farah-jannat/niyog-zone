"use client";
import BioCard from "@/components/bio-card";
import Container from "@/components/container";
import { recruiterMenus } from "@/constants";
import { useRecruiterCompaniesQuery } from "@/features/company/queries/use-recruiter-companies.query";
import JobDetailsTab from "@/features/job/components/job-details-tab";
import RecruiterJobList from "@/features/job/components/recruiter-job-list";
import { useUserQuery } from "@/features/user/queries/use-user.query";
import useTabs from "@/hooks/useTabs";
import { useParams, useRouter } from "next/navigation";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter()

  // ** --- Utility Hook ---
  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: recruiterMenus,
  });

  // ** --- Queires ---

  const { isLoading: isuserLoading, data: user } = useUserQuery(
    id,
    "profile=true"
    // "application=true&profile=true&job=true"
    // ""
  );
  console.log("user id here", id);
  const { isLoading, data } = useRecruiterCompaniesQuery({ recruiterId: id });
  if (isLoading) return "hello loading";
  console.log("data of user companis - ", data);

  if (isuserLoading) return null;

  return (
    <div className="bg-[#F5F6FD]">
      <Container className="bg-[#FFFFFF]">
        <BioCard user={user} />
      </Container>

      <Container className="pt-[60px]">
        <JobDetailsTab
          currentTabIndex={currentTabIndex}
          handleTabIndex={handleTabIndex}
          tabs={tabs}
        />
      </Container>

      <Container className="py-7">
        {currentTabIndex === 0 && <RecruiterJobList recruiterId={user?.id} />}
        {currentTabIndex === 1 && <p>current working on this</p>}
        <button onClick={()=>router.push(`/companies/create`)} className="cursor-pointer">Create company</button>
        {data?.map((item, idx) => (
          <div key={idx}>
            <p>{item.name}</p>
          </div>
        ))}
      </Container>

      {/* <Container className="pt-[18px] pb-[72px] bg-[#F5F6FD]">


      </Container> */}

      {/* <Container className="bg-[#F5F6FD] py-[20px]">
        <JobList
          subHeading="Jobs You  Applied Till Now"
          heading="Applied Jobs"
          isLoading={isuserLoading}
          jobs={user.applications.map((app) => app.job)}
        />
      </Container> */}
    </div>
  );
};

export default Profile;
