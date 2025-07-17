import { GET_COMPANY_BY_ID } from "@/graphql/query/getCompanyById";
import { setSingleCompany } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const { loading, error, data, refetch } = useQuery(GET_COMPANY_BY_ID, {
    variables: { companyId },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.getCompanyById) {
      console.log("the company", data.getCompanyById);
      dispatch(setSingleCompany(data.getCompanyById));
    }

    if (loading) {
      console.log("Fetching the company...");
    }
    if (error) {
      console.error("Error fetching the company:", error.message);
    }
  }, [companyId, loading, error, data, dispatch]);
};

export default useGetCompanyById;
