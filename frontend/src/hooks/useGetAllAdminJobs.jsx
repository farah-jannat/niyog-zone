import { GET_ALL_ADMIN_JOBS } from "@/graphql/query/GetAllAdminJobs";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllAdminJobs = (adminId) => {
  console.log('this is aadmin id',adminId)
  const dispatch = useDispatch();
  const { loading, data, error } = useQuery(GET_ALL_ADMIN_JOBS, {
    variables: { adminId },
    onCompleted: (data) => {
      dispatch(setAllAdminJobs(data.getAdminJobs));
    },
    onError: (err) => {
      toast.error(error.message);
    },
  });
};

export default useGetAllAdminJobs;

// useEffect(() => {
//   console.log("allllal jobs admn created", data);
//   if (data && data.getAdminJobs) {
//     dispatch(setAllAdminJobs(data.getAdminJobs));
//   }
//   if (loading) {
//     console.log("Fetching admin jobs...");
//   }
//   if (error) {
//     console.error("Error fetching admin jobs:", error.message);
//   }
// }, [loading, data, error, dispatch]);
