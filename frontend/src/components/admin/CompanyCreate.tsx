import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { toast } from "sonner";
import Navbar_two from "../shared/Navbar_two";
import { useMutation } from "@apollo/client";
import { REGISTER_COMPANY } from "@/graphql/mutation/registerCompany";
import { setLoading } from "@/redux/authSlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const { user } = useSelector((store) => store.auth);
  const userId = user?.id;
  const dispatch = useDispatch();

  const [registerCompany, { loading, data, error }] =
    useMutation(REGISTER_COMPANY);

  const registerNewCompany = async () => {
    // try {
    //   const res = await axios.post(
    //     `${COMPANY_API_END_POINT}/register`,
    //     { companyName },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   if (res?.data?.success) {
    //     dispatch(setSingleCompany(res.data.company))
    //     toast.success(res.data.message);
    //     const companyId = res?.data?.company?._id;
    //     navigate(`/admin/companies/${companyId}`);
    //   }
    // }

    dispatch(setLoading(true));
    await registerCompany({
      variables: {
        userId: userId,
        companyName: companyName,
      },
      onCompleted: (data) => {
        console.log("company Registration successful:", data.registerCompany);
        toast.success("company Registration successful!");
        dispatch(setSingleCompany(data.registerCompany));
        const companyId = data.registerCompany?.id;
        navigate(`/admin/companies/${companyId}`);
      },
      onError: (error) => {
        console.error(
          "Error registering company (GraphQL error):",
          error.message
        );
        toast.error(`Registration of company failed: ${error.message}`);
      },
    });
    //   } catch (error) {
    //     console.log("eroor from frontend resister company", error);
    //   }
    // };
  };
  // useEffect(() => {
  //   if (loading) {
  //     console.log("creating company...");
  //     dispatch(setLoading(true));
  //   } else {
  //     dispatch(setLoading(false));
  //   }

  //   if (data && data.registerCompany) {
  //     console.log("company Registration successful:", data.registerCompany);
  //     toast.success("company Registration successful!");
  //     dispatch(setSingleCompany(data.registerCompany));
  //     const companyId = data.registerCompany?.id;
  //     navigate(`/admin/companies/${companyId}`);
  //   }

  //   if (error) {
  //     console.error(
  //       "Error registering company (GraphQL error):",
  //       error.message
  //     );
  //     toast.error(`Registration of company failed: ${error.message}`);
  //   }
  // }, [loading, data, error, navigate, dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
          className=""
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button className='bg-[#287992] text-white hover:bg-[#216377] hover:text-white' onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
