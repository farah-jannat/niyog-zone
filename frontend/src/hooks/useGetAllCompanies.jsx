import { GET_COMPANIES } from "@/graphql/query/getCompanies";
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const userId = user?.id;
  const { loading, error, data, refetch } = useQuery(GET_COMPANIES, {
    variables: { userId },
    onCompleted: (data) => {
      dispatch(setCompanies(data.getCompanies));
    },
    onError: (error) => {
      toast.error(error.message);

      // console.error("Specific mutation failed:", err);
    },
  });

  //   useEffect(() => {
  //     if (data && data.getCompanies) {
  //       console.log("companies", data.getCompanies);
  //       dispatch(setCompanies(data.getCompanies));
  //     }

  //     if (loading) {
  //       console.log("Fetching companies...");
  //     }
  //     if (error) {
  //       console.error("Error fetching compaies:", error.message);
  //     }
  //   }, [data, loading, error, dispatch]);
};

export default useGetAllCompanies;
