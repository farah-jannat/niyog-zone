import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.Profile?.bio,
    skills: user?.Profile?.skills?.map((skill) => skill),
    resume: user?.Profile?.resume,
    profilePhoto: user?.Profile?.profilePhoto,
  });

  const dispatch = useDispatch();

  const changeEvenHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleProfilePhotoChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      profilePhoto: e.target.files[0],
    }));
  };
  const handleResumeChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      resume: e.target.files[0],
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("input  here ", input);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    if (input.resume) {
      // Check if a resume file is selected
      formData.append("resume", input.resume); // Append the resume file
    }

    console.log("input from profile update", input);
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/formdata",
          },
          withCredentials: true,
        }
      );
      console.log("response of updated data:", res);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("errpr while updata data from frontend", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  //   console.log("input here", input);
  //   console.log("user here", user);
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="fullName"
                  type="text"
                  value={input.fullName}
                  className="col-span-3"
                  onChange={changeEvenHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEvenHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEvenHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEvenHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEvenHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleResumeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Profile Picture
                </Label>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  className="con-span-3"
                  onChange={handleProfilePhotoChange}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
