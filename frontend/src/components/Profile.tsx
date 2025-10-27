import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./updateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Navbar_two from "./shared/Navbar_two";
import Container from "./container";
import CategoryCarousel from "./CategoryCarousel";
import UserTable from "./user-table";
import Footer from "./shared/Footer";
import CompaniesTable from "./admin/CompaniesTable";
import AdminJobsTable from "./admin/AdminJobsTable";
import { useNavigate } from "react-router-dom";
import useTabs from "@/hooks/useTabs";
import { profileMenus } from "@/constants";
import Tabs from "./tabs";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

const skills = ["Html", "javascript", "python", "c++", "css"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();

  // const { tabs, currentTab, handleTab } = useTabs(hola);
  // console.log("this is tabs currenttab andf", tabs, currentTab);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { currentTabIndex, handleTabIndex, tabs } = useTabs({
    tabs: profileMenus,
  });
  console.log("james userr", user?.id);

  useGetAllAdminJobs(user?.id);
  useGetAllCompanies();
  return (
    <div className="bg-[#F5F6FD]">
      <Navbar />
      <Container className="bg-[#FFFFFF]">
        <div className="grid py-[68px]  md:grid-cols-2 items-center gap-[0px] md:gap-[44px]  ">
          <div className=" h-[330px]">
            <img
              src={user?.Profile?.profilePhoto}
              alt=""
              className=" w-full h-full object-cover rounded-[8px]"
            />
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="w-full mt-[10px] bg-[#287992] text-white hover:bg-[#216377] hover:text-white"
            >
              Edit Profile
              <Pen />
            </Button>
          </div>
          <div className="">
            <div className="flex flex-col my-[68px] ">
              <h3 className="text-[#35373F] capitalize border-b border-[#EAF2F4] py-[18px] text-[28px] font-bold">
                {user?.fullName}
              </h3>
              <div className="flex flex-col items-start  gap-[4px] border-b border-[#EAF2F4]  py-[18px] ">
                <p className="text-[#03050F] max-w-[349px]">{user?.Profile?.bio}</p>

                {/* <p className="text-[#03050F] w-[349px]">
                  Exploring the world and capturing the small moments. Always
                  learning, always growing.
                </p> */}
              </div>
              <div className="flex flex-col gap-[12px] mt-[22px]">
                <div className="flex flex-col items-start gap-[2px] min-w-[186px]  ">
                  <p className="text-[#68696F] text-[12px]"> Phone </p>
                  <h3 className=" text-[#03050F] ">{user?.phoneNumber}</h3>
                  {/* <h3 className=" text-[#03050F] ">233583475</h3> */}
                </div>
                <div className="flex flex-col items-start   gap-[2px] min-w-[186px] ">
                  <p className="text-[#68696F] text-[12px]"> Email</p>
                  <h3 className=" text-[#03050F] ">{user?.email}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {user?.role == "student" ? (
        <>
          <Container className="">
            <div className="my-[30px] grid grid-cols-4 md:grid-cols-9 xl:grid-cols-12 gap-[16px] capitalize">
              {/* <CategoryCarousel /> */}
              {user?.Profile?.skills.map((item) => (
                <div className="flex flex-col items-start col-span-2 md:col-span-3  xl:col-span-2 bg-[#FAF2E9] bg-[#FEFEFF] rounded-[4px] gap-[4px]   sm:min-w-[100px] md:min-w-[172px] xl:min-w-[186px] py-[18px] px-[24px] ">
                  {/* <p className="text-[#68696F] text-[12px]"> 1 year+</p> */}
                  <h3 className=" text-[#03050F] ">{item}</h3>
                </div>
              ))}
            </div>
          </Container>
          <Container className="bg-[#FFFFFF]">
            <div className="py-[68px]"></div>
            <div className="flex flex-col gap-[12px">
              <p className="text-[#3E3F47] text-[12px]">
                Top Jobs You Applied Till Now
              </p>
              <h2 className="text-[32px] text-[#0E0F19] font-medium">
                Applied Jobs
              </h2>
            </div>

            <div className="mt-[30px] pb-[68px]">
              <AppliedJobTable />
            </div>

              <UpdateProfileDialog open={open} setOpen={setOpen} />
          </Container>
        </>
      ) : (
        <Container>
          <div className="my-[68px]">
            <div className="flex items-center justify-between  gap-[16px]  mx-auto">
              <div>
                <Tabs
                  currentTabIndex={currentTabIndex}
                  handleTabIndex={handleTabIndex}
                  tabs={tabs}
                />
              </div>

              {currentTabIndex === 0 ? (
                <Button
                  className="bg-[#E8C092] text-[#03050F] hover:bg-[#ceab83] rounded-[4px] text-[14px]"
                  onClick={() => navigate("/admin/companies/create")}
                >
                  <Plus />
                  Create New Company
                </Button>
              ) : (
                <Button
                  className="bg-[#E8C092] text-[#03050F] hover:bg-[#ceab83] rounded-[4px] text-[14px]"
                  onClick={() => navigate("/admin/jobs/create")}
                >
                  <Plus />
                  Create New job
                </Button>
              )}
            </div>
            <div className="mt-[30px]">
              {currentTabIndex === 0 && <CompaniesTable />}
              {currentTabIndex === 1 && <AdminJobsTable />}
              {/* {tabs[currentTabIndex].component()} */}
            </div>
          </div>
        </Container>
      )}
      <Footer />
    </div>
  );

  return (
    <div>
      <Navbar_two />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.Profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>{user?.Profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-right"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        {user?.role == "student" ? (
          <>
            <div className="my-4">
              <h1>Skills</h1>
              <div className="flex items-center gap-2 ">
                {user?.Profile?.skills?.length != 0 ? (
                  user?.Profile?.skills?.map((item, index) => (
                    <Badge className="px-3 py-1" key={index}>
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-md font-bold">Resume</Label>
              {isResume ? (
                <a
                  target="blank"
                  href={user?.Profile?.resume}
                  className="text-blue-500 w-full hover:underline cursor-pointer "
                >
                  {/* {user?.Profile?.resume} */}
                  My resume
                </a>
              ) : (
                <span>NA</span>
              )}
            </div>

            <div className="max-w-4xl mx-auto rounded2xl">
              <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
              <AppliedJobTable />
            </div>
          </>
        ) : (
          <span>:)</span>
        )}

        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
