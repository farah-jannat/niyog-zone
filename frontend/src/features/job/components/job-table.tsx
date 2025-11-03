import { Job } from "@/features/job/schemas/job.schema";
import { formatDistanceToNow } from "date-fns";

interface Props {
  jobs?: Job[];
}

const JobTable = (props: Props) => {
  const { jobs } = props;

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


  console.log("jobs is ", jobs)


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
              <td className="font-roboto text-sm text-[#3E3F47] text-center h-19 whitespace-nowrap">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
