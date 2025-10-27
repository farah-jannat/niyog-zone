import { GET_COMPANY_BY_ID } from "@/graphql/query/getCompanyById";
import { setSingleCompany } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  const { loading, error, data, refetch } = useQuery(GET_COMPANY_BY_ID, {
    variables: { companyId },
    onCompleted: (data) => {
      dispatch(setSingleCompany(data.getCompanyById));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useGetCompanyById;

// useEffect(() => {
//   if (data && data.getCompanyById) {
//     console.log("the company", data.getCompanyById);
//     dispatch(setSingleCompany(data.getCompanyById));
//   }

//   if (loading) {
//     console.log("Fetching the company...");
//   }
//   if (error) {
//     console.error("Error fetching the company:", error.message);
//   }
// }, [companyId, loading, error, data, dispatch]);
