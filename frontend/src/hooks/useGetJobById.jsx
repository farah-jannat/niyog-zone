import { GET_JOB_bY_ID } from "@/graphql/query/getJobById";
import { setSingleJob } from "@/redux/jobSlice";
import { useQuery } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";

const useGetJobById = (jobId) => {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_JOB_bY_ID, {
    variables: { jobId },
    onCompleted: (data) => {

      dispatch(setSingleJob(data.getJobById));
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default useGetJobById;

// useEffect(() => {
//   console.log("data desc of job --------------------", data);
//   if (data && data.getJobById) {
//     dispatch(setSingleJob(data.getJobById));
//     const isInitiallyApplied =
//       data.getJobById.applications?.some(
//         (application) => application.applicant === user?._id
//       ) || false;
//     setIsApplied(isInitiallyApplied);
//   }
// }, [jobId, dispatch, user?.id]);

// console.log("jlkjljl ========== ",singleJob)
