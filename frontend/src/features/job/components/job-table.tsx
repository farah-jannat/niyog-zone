import { deleteJob } from "@/features/job/api/mutations.api";
import useDeleteJobMutation from "@/features/job/mutations/use-delete-job.mutation";
import { Job } from "@/features/job/schemas/job.schema";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon, Edit2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  jobs?: Job[];
  
}

const JobTable = (props: Props) => {
  const { jobs } = props;
  // console.log("recruiid in jobtable", recruiterId)
  const router = useRouter();

  const columns = [
    {
      name: "Title",
    },

    {
      name: "Company",
    },

    {
      name: "Date",
    },

    // {
    //   name: "Actions",
    // },
  ];

  console.log("jobs is ", jobs);

  // *--- mutation ---

  const {mutate:deleteJob}  = useDeleteJobMutation()

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full rounded-[8px] overflow-hidden bg-[#FEFEFF] min-w-[800px]">
        <thead className="bg-[#287992]">
          <tr className="">
            {columns.map((col, index) => (
              <th
                key={index}
                className="uppercase min-h-[44px] font-roboto text-xs font-semibold text-[#F7F7FA] py-[16px] whitespace-nowrap"
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {jobs?.map((job) => (
            <tr key={job.id}>
              <td className="font-roboto text-sm text-[#3E3F47] h-19 whitespace-nowrap">
                {job.title}
              </td>

              <td className="font-roboto text-sm text-[#3E3F47] text-center h-19 whitespace-nowrap">
                {"Amazon"}
              </td>

              <td className="font-roboto text-sm text-[#3E3F47] text-center h-19 whitespace-nowrap">
                {/* {"Amazon"} */}
                {formatDistanceToNow(job.createdAt)} ago
              </td>
              {/* <td className="font-roboto text-sm text-[#3E3F47] text-center  h-20">
              </td> */}
              <td
                className="cursor-pointer"
                onClick={() => router.push(`/jobs/edit/${job?.id}`)}
              >
                {" "}
                <Edit2Icon size={14} />{" "}
              </td>

              <td
                className="cursor-pointer"
                onClick={()=>deleteJob(job?.id)}

              >
                {" "}
                <DeleteIcon size={16} />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
