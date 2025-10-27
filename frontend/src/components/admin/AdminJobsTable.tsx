import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Delete, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
import { GET_APPLICANTS } from "@/graphql/query/getApplicants";
import { useQuery } from "@apollo/client";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("called");
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div className="capitalize border border-[#E6E6E7] rounded-[8px] bg-white">
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-[#287992] hover:bg-[#287992]">
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              Company Name
            </TableHead>
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              Role
            </TableHead>
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              Date
            </TableHead>
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              Applicants
            </TableHead>
            <TableHead className="text-right text-[#F7F7FA] text-[12px] font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell>
                <div
                  onClick={() => navigate(`/admin/jobs/${job.id}/applicants`)}
                  className="text-blue-700 underline cursor-pointer"
                >
                  {" "}
                  see all applicants
                </div>
              </TableCell>
              <TableCell className="">
                <div className="flex items-center justify-end gap-[18px]">
                  <Delete size={22} className="text-red-600 cursor-pointer" />

                  <Edit2
                    size={18}
                    className="cursor-pointer"
                    onClick={() => navigate(`/admin/companies/${job.id}`)}
                  />
                </div>
              </TableCell>
              {/* <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onclick={() =>
                        navigate(`/admin/jobs/${job.id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
