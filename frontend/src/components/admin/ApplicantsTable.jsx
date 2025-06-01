import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";

const shortlisingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A list of recent appliced jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resulme</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <tr>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                  <PopoverContent className="w-32">
                    {shortlisingStatus.map((status, index) => {
                      return (
                        <div key={index}>
                          <span>{status}</span>
                        </div>
                      );
                    })}
                  </PopoverContent>
                </PopoverTrigger>
              </Popover>
            </TableCell>
          </tr>
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
