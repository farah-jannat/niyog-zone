import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { GET_ALL_JOBS_QUERY } from "@/graphql/query/getAllJobs";

const useGetAllJobs = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_JOBS_QUERY);
  console.log("data", data);
  // console.log("hello")
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    if (data && data.getAllJobs) {
      console.log("data and jobs client by grapql", data.getAllJobs);
      dispatch(setAllJobs(data.getAllJobs));
    }

    if (loading) {
      console.log("Fetching jobs...");
    }
    if (error) {
      console.error("Error fetching jobs:", error.message);
    }
  }, [data, loading, error, dispatch]);
};

export default useGetAllJobs;
