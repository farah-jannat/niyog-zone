import { GET_ALL_ADMIN_JOBS } from "@/graphql/query/GetAllAdminJobs";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = (adminId) => {
  const { loading, data, error } = useQuery(GET_ALL_ADMIN_JOBS, {
    variables: { adminId },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("allllal jobs admn created", data)
    if (data && data.getAdminJobs) {
      dispatch(setAllAdminJobs(data.getAdminJobs));
    }
    if (loading) {
      console.log("Fetching admin jobs...");
    }
    if (error) {
      console.error("Error fetching admin jobs:", error.message);
    }

    // const fetchAllAdminJobs = async () => {
    //   try {
    //     const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
    //       withCredentials: true,
    //     });
    //     if (res.data.success) {
    //       dispatch(setAllAdminJobs(res.data.jobs));
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchAllAdminJobs();
  }, [loading, data, error, dispatch]);
};

export default useGetAllAdminJobs;
