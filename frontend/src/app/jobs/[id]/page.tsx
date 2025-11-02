"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { jobMenus } from "@/constants";
import { createApplicationForm } from "@/features/application/default-form-values/create-application.form";
import { useCreateApplicationMutation } from "@/features/application/mutations/use-create-application.mutation";
import { useCheckApplicationQuery } from "@/features/application/queries/use-check-application.query";
import {
  insertApplicationSchema,
  InsertApplicationType,
} from "@/features/application/schemas/create-application.schema";
import JobCompany from "@/features/job/components/job-company";
import JobDescription from "@/features/job/components/job-descrption";
import JobDetailsTab from "@/features/job/components/job-details-tab";
import JobList from "@/features/job/components/job-list";
import JobTagList from "@/features/job/components/job-tag-list";
import { useJobQuery } from "@/features/job/queries/use-job.query";
import { useSimilarJobsQuery } from "@/features/job/queries/use-similar-jobs.query";
import useTabs from "@/hooks/useTabs";
import { useAuthStore } from "@/store/use-auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDistanceToNow } from "date-fns";
import { TimerResetIcon, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();

  // ** --- store ---
  const { authUser } = useAuthStore();

  // ** --- utlity hooks ---
  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: jobMenus,
  });

  // ** --- mutations hooks ---

  const { mutate: createApplication, isPending: isApplicationCreating } =
    useCreateApplicationMutation();

  // ** --- query hooks ---
  const { isLoading, data: job } = useJobQuery(id);

  const { data: isApplied } = useCheckApplicationQuery(
    authUser?.id,
    job?.id,
    !isApplicationCreating
  );

  // console.log("!!!!!!!!!!!!!!!1 ", typeof isApplied);

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

  // ** --- form hook ---
  const form = useForm<InsertApplicationType>({
    defaultValues: createApplicationForm(),
    resolver: zodResolver(insertApplicationSchema),
  });

  useEffect(() => {
    form.reset(createApplicationForm(authUser?.id, job?.id));
  }, [form, authUser, job]);

  if (isLoading) return null;

  // console.log(form.formState.errors);

  return (
    <div className="bg-[#F5F6FD]">
      <Container>
        <form
          className="flex flex-col min-h-[292px] gap-[26px] text-[#03050F] items-center justify-center card-gradient-bluish rounded-bl-[8px] rounded-br-[8px] text-[16px]"
          // onSubmit={form.handleSubmit((data) =>
          //   console.log("... data is ", data)
          // )}
          onSubmit={form.handleSubmit((data) => createApplication(data))}
        >
          <h2 className="text-[#35373F] text-[40px] font-bold">{job?.title}</h2>
          <div className="flex items-center gap-5">
            <div className=" flex items-center gap-2">
              <Users size={24} /> {job?.vacancy} vacancy
            </div>
            <div className="col-span-6 flex items-center gap-2">
              <TimerResetIcon size={24} />
              <span>
                Posted {job?.createdAt && formatDistanceToNow(job.createdAt)}{" "}
                ago
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className={`rounded-md px-4 py-2   text-[#03050F] ${
              isApplied
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-[#E8C092] hover:bg-[#cfac83]"
            } cursor-pointer`}
          >
            {isApplicationCreating === false && isApplied
              ? "Already Applied"
              : "Apply Now "}

            {isApplicationCreating && "Applying..."}
          </Button>
        </form>
      </Container>

      <Container className="pt-5 pb-2.5">
        <JobTagList job={job} />
      </Container>

      <Container className="pt-16">
        <JobDetailsTab
          currentTabIndex={currentTabIndex}
          handleTabIndex={handleTabIndex}
          tabs={tabs}
        />
      </Container>

      <Container className="pt-5">
        {currentTabIndex === 0 && (
          <JobDescription description={job?.description} />
        )}
        {currentTabIndex === 1 && <JobCompany companyId={job?.companyId} />}
      </Container>

      <Container className="pt-16 pb-16">
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
