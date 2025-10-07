import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
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
  TimerResetIcon,
  Twitter,
  University,
  User,
  User2Icon,
  Users,
} from "lucide-react";
import Navbar_two from "./shared/Navbar_two";
import { Separator } from "@radix-ui/react-select";
import Footer from "./shared/Footer";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_JOB_bY_ID } from "@/graphql/query/getJobById";
import { APPLY_JOB } from "@/graphql/mutation/applyJob";
import useGetJobById from "@/hooks/useGetJobById";
import Navbar from "./shared/Navbar";
import Container from "./container";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobsCards from "./LatestJobsCards";
import useTabs from "@/hooks/useTabs";
import { jobMenus } from "@/constants";
import Tabs from "./tabs";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const { allJobs } = useSelector((store) => store.job);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const { tabs, currentTabIndex, handleTabIndex } = useTabs({ tabs: jobMenus });

  const userId = user?.id;
  useGetCompanyById(singleJob?.company?.id);
  useGetJobById(jobId);
  const dispatch = useDispatch();

  // console.log("%%%%%%%%%%%%%%%%%%%%%%%", singleJob?.company?.id);
  const { singleCompany } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant.id === user?.id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  // const [isApplied, setIsApplied] = useState(false);
  console.log("singlejob ^^^^^^^^^^^^^^^", singleJob);
  // console.log("isanitially applied +++++++++++++++++++",isIntiallyApplied)

  const [applyJob, { applyJobLoading, applyJobData, applyJobError }] =
    useMutation(APPLY_JOB);
  // console.log("job id is (((((((((((", jobId, userId);

  const applyJobHandler = async () => {
    console.log("kkkkkkkkkkkkkkkk");
    await applyJob({
      variables: {
        userId: userId,
        jobId: jobId,
      },
      onCompleted: (applyJobData) => {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?.id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success("succesfully updated job");
      },
      onError: (applyJobError) => {
        console.log(applyJobError);
        toast.error(applyJobError);
      },
    });
  };

  console.log();

  return (
    <div className="bg-[#F5F6FD] capitalize">
      <Navbar />
      <Container>
        <div>
          <div className="flex flex-col min-h-[292px] gap-[26px] text-[#03050F] items-center justify-center card-gradient-bluish rounded-[8px] mt-[8px] text-[16px]">
            <h2 className="text-[#35373F] text-[40px] font-bold">
              {singleJob?.title}
            </h2>
            <div className="flex items-center gap-[20px]">
              <span className=" flex items-center gap-[8px] ">
                <Users size={24} /> {singleJob?.position} vacancy
              </span>
              <span className="col-span-6 flex items-center gap-[8px]">
                <TimerResetIcon size={24} /> Posted
                <p>
                  {daysAgoFunction(singleJob?.createdAt) == 0
                    ? "Today"
                    : `${daysAgoFunction(singleJob?.createdAt)} days ago`}
                </p>
              </span>
            </div>
            {user ? (
              <Button
                onClick={isApplied ? null : applyJobHandler}
                className={`rounded-md px-4 py-2   text-[#03050F] ${
                  isApplied
                    ? "bg-gray-600 text-white cursor-not-allowed"
                    : "bg-[#E8C092] hover:bg-[#cfac83]"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now "}
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className={`rounded-md px-4 py-2   text-[#03050F] ${
                  isApplied
                    ? "bg-gray-600 text-white cursor-not-allowed"
                    : "bg-[#E8C092] hover:bg-[#cfac83]"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now "}
              </Button>
            )}
          </div>
          {/* <CategoryCarousel /> */}
          <div className="my-[68px] grid grid-cols-4 md:grid-cols-9 xl:grid-cols-12 gap-[16px] capitalize">
            {/* <CategoryCarousel /> */}

            <div className="flex flex-col items-start col-span-2 md:col-span-3  xl:col-span-2 bg-[#FEFEFF] rounded-[4px] gap-[4px]   sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-[24px] ">
              <p className="text-[#68696F] text-[12px]"> Experience</p>
              <h3 className=" text-[#03050F] ">{singleJob?.experienceLevel} year+</h3>
            </div>
            <div className="flex flex-col items-start col-span-2 md:col-span-3  xl:col-span-2 bg-[#FEFEFF] rounded-[4px] gap-[4px]   sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-[24px] ">
              <p className="text-[#68696F] text-[12px]"> Employee Type</p>
              <h3 className=" text-[#03050F] ">{singleJob?.jobType}</h3>
            </div>
            <div className="flex flex-col items-start col-span-2 md:col-span-3  xl:col-span-2 bg-[#FEFEFF] rounded-[4px] gap-[4px]   sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-[24px] ">
              <p className="text-[#68696F] text-[12px]"> vacancy</p>
              <h3 className=" text-[#03050F] ">{singleJob?.position}</h3>
            </div>
            <div className="flex flex-col items-start col-span-2 md:col-span-3  xl:col-span-2 bg-[#FEFEFF] rounded-[4px] gap-[4px]   sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-[24px] ">
              <p className="text-[#68696F] text-[12px]"> Offer Salary</p>
              <h3 className=" text-[#03050F] ">${singleJob?.salary}/month</h3>
            </div>
            <div className="flex flex-col items-start col-span-2 md:col-span-3  xl:col-span-2 bg-[#FEFEFF] rounded-[4px] gap-[4px]   sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-[24px] ">
              <p className="text-[#68696F] text-[12px]"> Location </p>
              <h3 className=" text-[#03050F] ">{singleJob?.location}</h3>
            </div>
            <div className="flex flex-col items-start col-span-2 md:col-span-3  xl:col-span-2 bg-[#FEFEFF] rounded-[4px] gap-[4px]   sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-[24px] ">
              <p className="text-[#68696F] text-[12px]"> Posted</p>
              <h3 className=" text-[#03050F] ">
                {daysAgoFunction(singleJob?.createdAt) == 0
                  ? "Today"
                  : `${daysAgoFunction(singleJob?.createdAt)} days ago`}
              </h3>
            </div>
          </div>

          <div>
            {/* <div className="flex items-center justify-center md:justify-start gap-[16px]  mx-auto"> */}
            <div className="flex items-center justify-between">
              <Tabs
                currentTabIndex={currentTabIndex}
                handleTabIndex={handleTabIndex}
                tabs={tabs}
              />
              {user ? (
                <Button
                  onClick={isApplied ? null : applyJobHandler}
                  className={`rounded-md px-4 py-2   text-[#03050F] ${
                    isApplied
                      ? "bg-gray-600 text-white cursor-not-allowed"
                      : "bg-[#E8C092] hover:bg-[#cfac83]"
                  }`}
                >
                  {isApplied ? "Already Applied" : "Apply Now "}
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className={`rounded-md px-4 py-2   text-[#03050F] ${
                    isApplied
                      ? "bg-gray-600 text-white cursor-not-allowed"
                      : "bg-[#E8C092] hover:bg-[#cfac83]"
                  }`}
                >
                  {isApplied ? "Already Applied" : "Apply Now "}
                </Button>
              )}
            </div>
            {currentTabIndex === 0 ? (
              <div className="flex flex-col gap-5 bg-[#FFFFFF] rounded-[4px] min-h-[313px] p-[20px] mt-[16px]">
                <div className="prose">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: singleJob?.description,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate(`/companyProfile/${singleCompany?.id}`);
                }}
                className=" bg-[#FFFFFF] py-[38px] px-[24px] my-[16px]"
              >
                <div className="flex items-start gap-[16px]">
                  <img
                    src={singleCompany?.logo}
                    alt=""
                    className="rounded-[4px] h-[70px] w-[70px]"
                  />

                  <div className="flex flex-col gap-[4px]">
                    <h1 className="capitalize text-[#03050F] font-bold text-[20px]">
                      {singleCompany?.name}
                    </h1>
                    <div className="text-[#35373F]">
                      {singleJob?.location}
                      
                    </div>
                    {/* <span>2 open jobs</span> */}
                  </div>
                </div>

                <div className="flex flex-col my-[44px]">
                  <div className="flex flex-col items-start  gap-[4px] border-b  py-[18px] px-[24px] ">
                    <p className="text-[#68696F] text-[12px]"> Description</p>
                    <h3 className=" text-[#03050F] ">{singleCompany?.description}</h3>
                  </div>
                  <div className="flex flex-col items-start gap-[4px] border-b min-w-[186px] py-[18px] px-[24px] ">
                    <p className="text-[#68696F] text-[12px]">
                      {" "}
                      Website{" "}
                    </p>
                    <h3 className=" text-[#03050F] ">{singleCompany?.website}</h3>
                  </div>
                  <div className="flex flex-col items-start border-b  gap-[4px] min-w-[186px] py-[18px] px-[24px] ">
                    <p className="text-[#68696F] text-[12px]"> Location </p>
                    <h3 className=" text-[#03050F] ">{singleJob?.location}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="my-[68px]">
          <h2 className="text-[32px] text-[#0E0F19] font-medium ">
            Latest Jobs
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[16px] mt-[40px]">
            {allJobs?.length <= 0 ? (
              <span>No Job Available</span>
            ) : (
              allJobs?.slice(0, 3).map((job) => (
                <div>
                  {" "}
                  <LatestJobsCards key={job.id} job={job} />
                </div>
              ))
            )}
          </div>
        </div>
        {/* </div> */}
      </Container>
      <Footer />
    </div>
  );

  return (
    // <div>hello</div>
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
                {singleJob?.jobType}
              </div>
              <div className="flex gap-1 items-center text-gray-500">
                <Clock7 size={15} />
                <p>
                  {daysAgoFunction(singleJob?.createdAt) == 0
                    ? "Today"
                    : `${daysAgoFunction(singleJob?.createdAt)} days ago`}
                </p>
              </div>
            </div>
          </div>
          {/* <button className=" bg-Blue px-4 py-2 rounded-md text-White ">
            Apply Now
          </button> */}
          <Button
            onClick={isApplied ? null : applyJobHandler}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-White ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-Blue hover:bg-blue-900"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now "}
          </Button>
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
                <div className="prose">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: singleJob?.description,
                    }}
                  />
                </div>
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
                    src={singleCompany?.logo}
                    // src={}
                    alt=""
                    className="rounded-md h-12 w-12"
                  />

                  <div className="flex flex-col gap-1">
                    <h1 className="capitalize text-normal font-semibold">
                      {singleCompany?.name}
                    </h1>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={15} />
                      {singleCompany?.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between mt-10 text-gray-500">
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={isApplied ? null : applyJobHandler}
                      className={`rounded-md px-4 py-2 text-sm font-semibold text-White ${
                        isApplied
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-Blue hover:bg-blue-900"
                      }`}
                    >
                      {isApplied ? "Already Applied" : "Apply Now "}
                    </Button>
                    {/* <button className="text-sm font-semibold px-4 py-2 border border-gray-150  rounded-md">
                      Save job
                    </button> */}
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
              <div
                onClick={() => {
                  navigate(`/companyProfile/${singleCompany?.id}`);
                }}
                className="max-w-[200px]  flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={singleCompany?.logo}
                  alt=""
                  className="rounded-full h-12 w-12"
                />

                <div>
                  <h1 className="capitalize text-normal font-semibold">
                    {singleCompany?.name}
                  </h1>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={15} />
                    {singleJob?.location}
                  </div>
                  {/* <span>2 open jobs</span> */}
                </div>
              </div>
              <Separator className="border-t" />
              <div className="w-full h-[150px]">
                <img
                  src="../../public/Home_Create_Profile.png"
                  alt=""
                  className="rounded-md object-cover object-center w-full h-full"
                />
              </div>

              <div className="line-clamp-4 text-gray-500 text-sm">
                <p>{singleCompany?.description}</p>
              </div>
            </div>

            <div className="border border-gray-150 p-4 flex flex-col gap-3  ">
              <h2 className="text-Black font-semibold">Similar Jobs</h2>
              <Separator className="border-t" />
              <div className="flex flex-col items-start gap-5 ">
                {allJobs.map((job, idx) => (
                  <>
                    <div
                      className={`cursor-pointer flex-1 flex items-center justify-between min-w-[250px] max-w-[300px] gap-5 border-b ${
                        selectedJobId === job.id ? "bg-blue-200" : ""
                      }`}
                      onClick={() => {
                        setSelectedJobId(job.id);
                        navigate(`/description/${job.id}`);
                      }}
                    >
                      <div className="flex items-start gap-3 ">
                        <img
                          // src={job?.company?.logo}
                          src={job?.company?.logo}
                          alt=""
                          className="rounded-md h-12 w-12"
                        />

                        <div className=" flex flex-col gap-1  w-full">
                          <h1 className="capitalize text-normal font-semibold">
                            {job?.company?.name}
                          </h1>
                          <div className="flex items-center  justify-between gap-3">
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock7 size={15} />
                              <p>
                                {daysAgoFunction(job?.createdAt) == 0
                                  ? "Today"
                                  : `${daysAgoFunction(
                                      job?.createdAt
                                    )} days ago`}
                              </p>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin size={15} />
                              {job?.location}
                            </div>
                          </div>

                          <div className="text-blue-700 font-bold capitalize p-0 border-none flex  items-center justify-between">
                            <h1 className="text-Blue font-semibold text-md">
                              ${job?.salary}k
                              <span className="text-[12px] font-semibold text-gray-500">
                                /Hour
                              </span>
                            </h1>

                            <span className="text-[12px] text-green-500 font-semibold">
                              {job.jobType}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* <Separator className="border-t mt-5" /> */}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
