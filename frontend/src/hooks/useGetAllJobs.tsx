import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import { GET_ALL_JOBS_QUERY } from "@/graphql/query/getAllJobs";
import { toast } from "sonner";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const { loading, error, data, refetch } = useQuery(GET_ALL_JOBS_QUERY, {
    variables: { searchedQuery },
    onCompleted: (data) => {
      // console.log("alljlobs successful ******************:", data);
      // toast.success("fetched all jobs succesfully");
      dispatch(setAllJobs(data.getAllJobs));
    },
    onError: (error) => {
      toast.error(error.message);

      // console.error("Specific mutation failed:", err);
    },
  });

  // console.log("hello")

  //   useEffect(() => {
  //     if (data && data.getAllJobs) {
  //       console.log("data and jobs client by grapql", data.getAllJobs);
  //       dispatch(setAllJobs(data.getAllJobs));
  //     }

  //     if (loading) {
  //       console.log("Fetching jobs...");
  //     }
  //     if (error) {
  //       console.error("Error fetching jobs:", error.message);
  //     }
  //   }, [data, loading, error, dispatch]);
  // };
};
export default useGetAllJobs;
