import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { useQuery } from "@apollo/client";
import { GET_APPLICANTS } from "@/graphql/query/getApplicants";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const jobId = params.id;

  const { loading, data, error } = useQuery(GET_APPLICANTS, {
    variables: { jobId },
  });
  useEffect(() => {
    if (data && data.getApplicants) {
      console.log("data and jobs client by grapql", data.getApplicants);
      dispatch(setAllApplicants(data.getApplicants));
    }

    if (loading) {
      console.log("Fetching applicants...");
    }
    if (error) {
      console.error("Error fetching applicants:", error.message);
    }
  }, [loading, data, error, dispatch]);
  return (
    <div>
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto">
          <h1 className="font-bold text-xl my-5">
            Applicants {applicants?.applications?.length}
          </h1>
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
