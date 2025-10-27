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
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { UPDATE_STATUS } from "@/graphql/mutation/updateStatus";

const shortlisingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
console.log("***************",applicants)
  const [updateStatus, { loading, error, data }] = useMutation(UPDATE_STATUS);
  const statusHandler = async (status, id) => {
    console.log("applicationid((((((((((((((", id, status)
    await updateStatus({
      variables: {
        applicationId: id,
        status: status,
      },
      onCompleted: (data) => {
        toast.success("updated application status successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    console.log("called");
    // try {
    //   axios.defaults.withCredentials = true;
    //   const res = await axios.post(
    //     `${APPLICATION_API_END_POINT}/status/${id}/update`,
    //     { status }
    //   );
    //   console.log(res);
    //   if (res.data.success) {
    //     toast.success(res.data.message);
    //   }
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
  };

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
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                {/* <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell> */}
                <TableCell>{item?.applicant?.createdAt}</TableCell>
                <TableCell className="float-right  cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                      <PopoverContent className="w-32">
                        {shortlisingStatus.map((status, index) => {
                          return (
                            <div
                              onClick={() => statusHandler(status, item?.id)}
                              key={index}
                              className="flex w-fit items-center my-2 cursor-pointer"
                            >
                              <span>{status}</span>
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </PopoverTrigger>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
