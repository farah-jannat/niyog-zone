import { Job } from "@/features/job/schemas/job.schema";

interface Props {
  description: Job["description"] | undefined;
}

const JobDescription = (props: Props) => {
  const { description } = props;
  return (
    <div className="bg-[#FEFEFF] rounded-[4px] min-h-[316px] p-6">
      {description}
    </div>
  );
};

export default JobDescription;
