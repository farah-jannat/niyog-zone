import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import store from "@/redux/store";
import { toast } from "sonner";
import {
  BadgeCent,
  BriefcaseBusiness,
  Building2,
  CheckCheck,
  Clock12,
  Clock7,
  FacebookIcon,
  Home,
  MapPin,
  Twitter,
  University,
} from "lucide-react";
import Navbar_two from "./shared/Navbar_two";
import { Separator } from "@radix-ui/react-select";
import Footer from "./shared/Footer";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("this is res of job description", res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
          console.log("here is the isapplied", isApplied);
          console.log("songlejob", singleJob);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    // <div className="max-w-7xl mx-auto my-10">
    //   <div className="flex items-center justify-between">
    //     <div>
    //       <h1 className="font-bold text-xl">{singleJob?.title}</h1>
    //       <div className="flex items-center gap-2 mt-4">
    //         <Badge className={"text-blue-700 font-bold"} variant="ghost">
    //           {singleJob?.position}
    //         </Badge>
    //         <Badge className={"text-[#F83002] font-bold"} variant="ghost">
    //           {" "}
    //           {singleJob?.jobType}
    //         </Badge>
    //         <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
    //           {singleJob?.salary}
    //         </Badge>
    //       </div>
    //     </div>
    //     <Button
    //       onClick={isApplied ? null : applyJobHandler}
    //       className={`rounded-lg ${
    //         isApplied
    //           ? "bg-gray-600 cursor-not-allowed"
    //           : "bg-[#7209b7] hover:bg-[#5f32ad]"
    //       }`}
    //     >
    //       {isApplied ? "Already Applied" : "Apply Now "}
    //     </Button>
    //   </div>
    //   <h1 className="border-b-2 border-gray-200 font-medium py-4">
    //     Job Description
    //   </h1>
    //   <div className="my-4">
    //     <h1 className="font-bold my-1">
    //       Role:{" "}
    //       <span className="pl-4 font-normal text-gray-800">
    //         {singleJob?.title}
    //       </span>
    //     </h1>
    //     <h1 className="font-bold my-1">
    //       Location:{" "}
    //       <span className="pl-4 font-normal text-gray-800">
    //         {singleJob?.location}
    //       </span>
    //     </h1>
    //     <h1 className="font-bold my-1">
    //       Description:{" "}
    //       <span className="pl-4 font-normal text-gray-800">
    //         {singleJob?.description}
    //       </span>
    //     </h1>
    //     <h1 className="font-bold my-1">
    //       Experince:{" "}
    //       <span className="pl-4 font-normal text-gray-800">
    //         {singleJob?.experienceLevel}
    //       </span>
    //     </h1>
    //     <h1 className="font-bold my-1">
    //       Salary:{" "}
    //       <span className="pl-4 font-normal text-gray-800">
    //         {singleJob?.salary}
    //       </span>
    //     </h1>
    //     <h1 className="font-bold my-1">
    //       Total Applicant:{" "}
    //       <span className="pl-4 font-normal text-gray-800">
    //         {singleJob?.applications?.length}
    //       </span>
    //     </h1>
    //     <h1 className="font-bold my-1">
    //       Posted Date:{" "}
    //       <span className="pl-4 font-normal text-gray-800">
    //         {singleJob?.createdAt.split("T")[0]}
    //       </span>
    //     </h1>
    //   </div>
    // </div>
    <div>
      <Navbar_two />
      <div className="w-[90%] lg:w-[80%] mx-auto mt-10">
        <div className="flex items-center justify-between my-5">
          <div className="">
            <h1 className="font-semibold capitalize text-2xl  text-Black">
              {singleJob?.title}
            </h1>
            <div className="flex gap-1 items-center text-[12px] font-semibold  mt-2">
              <div className="flex gap-1 items-center text-gray-500 mr-3">
                <BriefcaseBusiness size={15} />
                Fulltime
              </div>
              <div className="flex gap-1 items-center text-gray-500">
                <Clock7 size={15} />3 days ago
              </div>
            </div>
          </div>
          <button className="text-sm font-semibold bg-Blue px-4 py-2 rounded-md text-White ">
            Apply Now
          </button>
        </div>

        <Separator className=" border-t" />
        <div className="flex  flex-col items-start gap-10 mt-5 mb-10  md:flex-row">
          {/* left  */}
          <div className="md:w-[60%]   lg:w-[70%] ">
            {/* left first  part  */}
            <div className="flex flex-col gap-5 max-w-[full] border border-gray-150 p-5 text-sm">
              <h2 className="font-semibold text-Black text-[16px]">
                Emploiment Information
              </h2>
              <Separator className="border-b" />

              <div className="flex items-center flex-wrap gap-5 text-Black">
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex flex-col items-start  gap-5">
                    <div className="flex  items-center gap-1 text-gray-500">
                      <Building2 size={18} className="" />
                      <span className="">Industry</span>
                    </div>
                    <div className="flex  items-center gap-1 text-gray-500 ">
                      <BadgeCent size={18} className="" />
                      <span className="">Selery</span>
                    </div>
                    <div className="flex  items-center gap-1 text-gray-500">
                      <University size={18} className="" />
                      <span className="">Job Type</span>
                    </div>
                    <div className="flex  items-center gap-1 text-gray-500">
                      <Clock12 size={18} className="" />
                      <span className="">Updated</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start  gap-5">
                    <p>Mechanical/Auto/Automat</p>
                    <p>80k-120k</p>
                    <p>Parmanent</p>
                    <p>10/07/2025</p>
                  </div>
                </div>

                <div className="flex-1 flex items-start gap-3">
                  <div className="flex flex-col items-start  gap-5">
                    <div className="flex  items-center gap-1 text-gray-500">
                      <Building2 size={18} className="" />
                      <span>Job Level</span>
                    </div>
                    <div className="flex  items-center gap-1 text-gray-500 ">
                      <BadgeCent size={18} className="" />
                      <span className="">Selery</span>
                    </div>
                    <div className="flex  items-center gap-1 text-gray-500">
                      <University size={18} className="" />
                      <span className="">Job Type</span>
                    </div>
                    <div className="flex  items-center gap-1 text-gray-500">
                      <Clock12 size={18} className="" />
                      <span className="">Updated</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start  gap-5">
                    <p>Experience(non-manger)</p>
                    <p>80k-120k</p>
                    <p>Parmanent</p>
                    <p>10/07/2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second  part */}
            <div className="flex flex-col gap-5 mt-5">
              <div className="flex flex-col gap-5">
                <h2 className="font-semibold text-gray-600  text-xl">
                  Wellcome to Nokia Team
                </h2>
                <p className="text-gray-500 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Minus nulla debitis vel numquam, ullam magnam voluptatum vitae
                  exercitationem aliquid, Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Minus nulla debitis vel
                  numquam, ullam magnam voluptatum vitae exercitationem
                  aliquid,Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Hic aspernatur nulla maxime quaerat, consectetur
                  blanditiis.
                </p>
              </div>
              <div className="flex flex-col gap-5 text-gray-500 text-sm">
                <h2 className="font-semibold text-gray-600  text-xl">
                  Essential knowledge, Skills, and
                </h2>
                <ul class="list-disc flex flex-col gap-3 px-8">
                  <li>
                    should learn the things more importand ulla debitis vel
                  </li>
                  <li>
                    numquam, ullam magnam voluptatum vitae exercitationem
                    aliquid,
                  </li>
                  <li>
                    el numquam, ullam magnam voluptatum vitae exercitationem
                  </li>
                  <li>
                    el numquam, ullam magnam voluptatum vitae exercitationem
                  </li>
                  <li>
                    el numquam, ullam magnam voluptatum vitae exercitationem
                  </li>
                  <li>
                    el numquam, ullam magnam voluptatum vitae exercitationem
                    aliquid, delectus faci
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-5 text-gray-500 text-sm">
                <h2 className="font-semibold text-gray-600 text-xl">
                  Preferred Experience
                </h2>
                <ul class="list-disc flex flex-col gap-3 px-8">
                  <li>
                    should learn the things more importand ulla debitis vel
                  </li>
                  <li>
                    numquam, ullam magnam voluptatum vitae exercitationem
                    aliquid,
                  </li>
                  <li>
                    el numquam, ullam magnam voluptatum vitae exercitationem
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-5">
                <h2 className="font-semibold text-gray-600  text-xl">
                  Product Designs
                </h2>
                <p className="text-gray-500 text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Minus nulla debitis vel numquam, ullam magnam voluptatum vitae
                  exercitationem aliquid, Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Minus nulla debitis vel
                  numquam, ullam magnam voluptatum vitae exercitationem
                  aliquid,Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Hic aspernatur nulla maxime quaerat, consectetur
                  blanditiis.
                </p>
              </div>
              {/* <p className="text-[16px] text-gray-600 ">
                {" "}
                _<span className="font-semibold">Nokia</span>_
              </p> */}
              <div className="flex items-end  justify-between ">
                <div className="flex items-center gap-3 ">
                  <img
                    // src={singleJob?.company?.logo}
                    src="../../public/company-logo.png"
                    alt=""
                    className="rounded-md h-12 w-12"
                  />

                  <div className="flex flex-col gap-1">
                    <h1 className="capitalize text-normal font-semibold">
                      {singleJob?.company?.name} Nokia
                    </h1>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={15} />
                      Bangladesh
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between mt-10 text-gray-500">
                  <div className="flex items-center gap-3">
                    <button className="text-sm font-semibold bg-Blue px-4 py-2 rounded-md text-White">
                      Apply Now
                    </button>
                    <button className="text-sm font-semibold px-4 py-2 border border-gray-150  rounded-md">
                      Save job
                    </button>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-500">Share this</p>
                    <Twitter size={18} />
                    <FacebookIcon size={18} />
                    <FacebookIcon size={18} />
                    <FacebookIcon size={18} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* right  */}
          <div className="hidden md:flex flex-col gap-5 md:w-[40%]  lg:w-[30%] ">
            <div className="hidden md:flex flex-col gap-3 border border-gray-150 p-4 max-w-full ">
              <div className="max-w-[200px]  flex items-center gap-3">
                <img
                  src={singleJob?.company?.logo}
                  alt=""
                  className="rounded-full h-12 w-12"
                />

                <div>
                  <h1 className="capitalize text-normal font-semibold">
                    {singleJob?.company?.name} name
                  </h1>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={15} />
                    Bangladesh
                  </div>
                  <span>2 open jobs</span>
                </div>
              </div>
              <Separator className="border-t" />
              <div className="w-full h-[150px]">
                <img
                  src="../../public/Home_Create_Profile.png"
                  alt=""
                  className="rounded-md w-full h-full"
                />
              </div>

              <div className="">
                <ul>
                  <li>this is point number 1. we will see more points</li>
                  <li>this is point number 1</li>
                  <li>this is point number 1</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-150 p-4 flex flex-col gap-3  ">
              <h2 className="text-Black font-semibold">Similar Jobs</h2>
              <Separator className="border-t" />
              <div className="flex flex-col items-center gap-5">
                {[1, 2, 3, 4, 5].map((job, idx) => (
                  <>
                    <div className="text-Black cursor-pointer flex-1 flex items-center gap-5">
                      <div className="flex items-start gap-3 ">
                        <img
                          // src={job?.company?.logo}
                          src="../../public/company-logo.png"
                          alt=""
                          className="rounded-md h-12 w-12"
                        />

                        <div className=" flex flex-col gap-1">
                          <h1 className="capitalize text-normal font-semibold">
                            {job?.company?.name} Company Name
                          </h1>
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock7 size={15} />3 min
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin size={15} />
                              Bangladesh
                            </div>
                          </div>

                          <div className="text-blue-700 font-bold capitalize p-0 border-none flex  items-center justify-between">
                            <h1 className="text-Blue font-semibold text-md">
                              ${job?.salary}300
                              <span className="text-[12px] font-semibold text-gray-500">
                                /Hour
                              </span>
                            </h1>

                            <span className="text-[12px] text-green-500 font-semibold">
                              Full Time
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator className="border-t" />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default JobDescription;
