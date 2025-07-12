import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import Navbar_two from "../shared/Navbar_two";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <div>
        {/* part1 */}
        <div className="bg-grayish ">
          <Navbar_two />
          <div className="flex items-center justify-between my-10">
            <Input
              className="w-fit"
              placeholder="filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={() => navigate("/admin/companies/create")}>
              New Company
            </Button>
          </div>
        </div>
        {/* part2 */}
        <div></div>

        {/* <div className="max-w-6xl mx-auto my-10 ">
          <div className="flex items-center justify-between ">
            <Input
              className="w-fit"
              placeholder="filter by name"
              onChange={(e) => setInput(e.target.value)}
            />

           
        </div> */}

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
