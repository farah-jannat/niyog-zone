import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log("all jobs mim applied to :", allAppliedJobs);
  return (
    <div className="rounded-[8px] border border-[#E6E6E7] capitalize">
      <Table>
        {/* <TableCaption>A list of your applied jobs</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-[#287992] hover:bg-[#287992]">
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold ">
              JOB ROLE
            </TableHead>
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              COMPANY
            </TableHead>
            {/* <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              JOB ROLE
            </TableHead> */}
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              DATE
            </TableHead>
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold text-right">
              STATUS
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <p className="mt-[20px]">You haven't applied any job yet.</p>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
