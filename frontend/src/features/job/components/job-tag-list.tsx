import TagCard from "@/components/tag-card";
import { Job } from "@/features/job/schemas/job.schema";
import { formatDistanceToNow } from "date-fns";

interface Props {
  job: Job;
}

const JobTagList = (props: Props) => {
  const { job } = props;

  return (
    <div className="my-[68px] grid grid-cols-4 md:grid-cols-9 xl:grid-cols-12 gap-4 capitalize">
      <TagCard label="Experience" value={`${job?.experience} year+`} />

      <TagCard label="Employee Type" value={job?.jobType} />

      <TagCard label="Vacancy" value={job?.vacancy} />

      <TagCard label="Offer Salary" value={`$${job?.salary}/month`} />

      <TagCard label="Location" value={job?.location} />

      <TagCard
        label="Posted"
        value={`${formatDistanceToNow(job.createdAt)} ago`}
      />
    </div>
  );
};

export default JobTagList;
