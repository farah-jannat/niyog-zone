import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

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
          <Navbar />
          <div className="flex items-center justify-between">
            <Input
              className="w-fit"
              placeholder="filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-button_blue text-center text-white py-2 px-4 rounded-xl">
              New Company
            </button>
          </div>
        </div>
        {/* part2 */}
        <div></div>
        {/* <Navbar />
        <div className="max-w-6xl mx-auto my-10 ">
          <div className="flex items-center justify-between ">
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
        <CompaniesTable /> */}
      </div>
    </div>
  );
};

export default Companies;
