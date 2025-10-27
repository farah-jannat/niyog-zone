import React from "react";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_APPLIED_JOBS } from "@/graphql/query/getAppliedJobs";
import store from "@/redux/store";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const userId = user?.id;
  const { loading, error, data } = useQuery(GET_APPLIED_JOBS, {
    variables: { userId },
    onCompleted: (data) => {
      dispatch(setAllAppliedJobs(data.getAppliedJobs));
    },
    onError: (error) => {
      toast.error(error.message);

      // console.error("Specific mutation failed:", err);
    },
  });
};

export default useGetAppliedJobs;

// useEffect(() => {
//     console.log("data form applied jobs", data);
//     if (data && data.getAppliedJobs) {
//       dispatch(setAllAppliedJobs(data.getAppliedJobs));
//     }
//     if (loading) {
//       console.log("Fetching applied jobs...");
//     }
//     if (error) {
//       console.error("Error fetching applied jobs:", error.message);
//     }

//   }, [data, loading, error, dispatch]);
