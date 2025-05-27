import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./updateProfileDialog";

const skills = ["Html", "javascript", "python", "c++", "css"];
const isResume = true;
const Profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
                quaerat optio dignissimos quia tenetur voluptatem?
              </p>
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
            <span>mim@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>87867857</span>
          </div>
        </div>
        <div className="my-4">
          <h1>Skills</h1>
          <div className="flex items-center gap-2 ">
            {skills.length != 0 ? (
              skills.map((item, index) => (
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
              href=""
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              this the resume
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto rounded2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
