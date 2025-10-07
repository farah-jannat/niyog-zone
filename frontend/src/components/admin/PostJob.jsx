import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import JobDescription from "./AdminJobDescription";
import AdminJobDescription from "./AdminJobDescription";
import Navbar_two from "../shared/Navbar_two";
import { useMutation } from "@apollo/client";
import { POST_JOB } from "@/graphql/mutation/postJob";
import { setLoading, setUser } from "@/redux/authSlice";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    location: "",
    jobType: "",
    experience: 0,
    position: 0,
    companyId: "",
  });
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const { user } = useSelector((store) => store.auth);
  const userId = user?.id;
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // const changeEventHandler = (e) => {
  //   const { name, value } = e.target;

  //   const numericFields = ["salary", "experience", "position"];
  //   const parsedValue = numericFields.includes(name)
  //     ? parseInt(value, 10)
  //     : value;

  //   setInput({ ...input, [name]: parsedValue });
  // };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany.id });
    console.log("(((((((((((((", selectedCompany.id);
  };

  const handleDescriptionChange = (html) => {
    // This function will be called by AdminJobDescription with the Quill content
    console.log("thmls is ", html);

    setInput((prevInput) => ({
      ...prevInput,
      description: html,
    }));

    // console.log("content came from description", html);
    // setInput((prevInput) => ({
    //   ...prevInput,
    //   description: html,
    // }));
  };

  // console.log("input of job", input);
  const [postJob, { loading, error, data }] = useMutation(POST_JOB);

  const submitHandler = async (e) => {
    e.preventDefault();

    await postJob({
      variables: {
        userId: userId,
        title: input.title,
        description: input.description,
        requirements: input.requirements,
        salary: Number(input.salary),
        location: input.location,
        jobType: input.jobType,
        experienceLevel: Number(input.experience),
        position: Number(input.position),
        companyId: input.companyId,
      },
      onCompleted: (data) => {
        console.log("postjob successful:", data.postJob);
        toast.success("successfully posted job");
        navigate("/profile");
      },
      onError: (error) => {
        console.error("Error psting job (GraphQL error):", error.message);
        toast.error(`postjob failed: ${error.message}`);
      },
    });
    // } catch (error) {
    //   console.log("error", error.response);
    //   toast.error(error.response);
    // } finally {
    //   setLoading(false);
    // }
  };
  // useEffect(() => {
  //   if (loading) {
  //     console.log("posting job...");
  //     dispatch(setLoading(true));
  //   } else {
  //     dispatch(setLoading(false));
  //   }

  //   if (data && data.postJob) {
  //     console.log("postjob successful:", data.postJob);
  //     toast.success("successfully posted job");
  //     dispatch(setUser(data.postJob));
  //     navigate("/admin/jobs");
  //   }

  //   if (error) {
  //     console.error("Error psting job (GraphQL error):", error.message);
  //     toast.error(`postjob failed: ${error.message}`);
  //   }
  // }, [loading, data, error, navigate, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto my-5  w-[80%]">
        <form onSubmit={submitHandler} className=" w-full">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              {/* <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              /> */}
              <AdminJobDescription
                onDescriptionChange={handleDescriptionChange}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder=""
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder=""
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Bonani, Dhaka"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Fulltime"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="2"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Postion</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="9"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="bg-[#287992] text-[#F5F6FD]  w-full my-4  hover:bg-[#216377] hover:text-white">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button
              className="bg-[#287992] text-[#F5F6FD]  w-full my-4  hover:bg-[#216377] hover:text-white"
              type="submit"
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
