"use client"

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
import { Delete, Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const router = useRouter();

  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);

  console.log("here is all company admin created", companies);
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div className="bg-white rounded-[8px] border border-[#E6E6E7] ">
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-[#287992] hover:bg-[#287992] rounded-[8px]">
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              Logo
            </TableHead>
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              Name
            </TableHead>
            <TableHead className="text-[#F7F7FA] text-[12px] font-semibold">
              Date
            </TableHead>
            <TableHead className="text-right text-[#F7F7FA] text-[12px] font-semibold'">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            // <tr>
            <TableRow>
              <TableCell>
                {/* <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar> */}
                <div className="h-[37px] w-[79px]">
                  <img
                    src={company.logo}
                    alt=""
                    className="w-full h-full rounded-[4px] object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="">
                <div className="flex items-center justify-end gap-[18px]">
                  <Delete size={22} className="text-red-600 cursor-pointer" />

                  <Edit2
                    size={18}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/admin/companies/${company.id}`)
                    }
                  />
                </div>
              </TableCell>
              {/* <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-32 hover:bg-gray-200"
                      onClick={() => navigate(`/admin/companies/${company.id}`)}
                    >
                      <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell> */}
            </TableRow>
            // </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
