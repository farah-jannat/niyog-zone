import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Bell, LogOut, Menu, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-[#FAF3E9] py-[12px] px-[16px] md:px-[60px] mx-auto md:h-[114px] text-[#35373F]">
        <div>
          <h1 className="text-[18px]  ">
            <span className="text-[#287992]">Niyog</span>
            <span className="text-[#E8C092]">Zone</span>
          </h1>
        </div>

        <div>
          <ul className="text-[14px] md:text-[16px] hidden md:flex items-center  gap-[54px]">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/"
                    className={`hidden sm:block ${
                      location.pathname === "/"
                        ? "border-b border-[#A1DD5F]" // Active style
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                {/* <li>
                  <Link to="/admin/companies">My Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">My Jobs</Link>
                </li> */}
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={`hidden sm:block ${
                      location.pathname === "/"
                        ? "border-b border-[#A1DD5F]" // Active style
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="/login">
                  <Link to="">Sign In</Link>
                </li>

                <li>
                  <Link to="/signup" className="hidden sm:block">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="md:hidden tex-[#35373F]">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            {!user ? (
              <div className="">
                {/* <Link to="/signup">
                <Button variant="none" className="underline">
                  Signup
                </Button>
              </Link> */}
                <Link to="/signup">
                  <Button
                    variant="outline"
                    className="bg-[#287992] text-[#F5F6FD] py-[5px] px-[20px] "
                  >
                    Join
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                {/* <div className="relative">
                <Bell size={28} />
                <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
                  1
                </div>
              </div> */}

                <div className="hidden sm:flex flex-col items-start">
                  <h2 className="font-semibold">{user?.fullName}</h2>
                  <h1 className="text-sm text-gray-500">{user?.role}</h1>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src={user?.Profile?.profilePhoto}
                        alt="@shadcn"
                        className="w-[35px] h-[35px] rounded-full"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div>
                      <div className="flex gap-2 space-y-2  items-center">
                        <Avatar className="cursor-pointer">
                          <AvatarImage
                            src={user?.Profile?.profilePhoto}
                            alt="@shadcn"
                          />
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{user?.fullName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {user?.Profile?.bio}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col my-2 text-gray-600 ">
                        {/* {user?.role == "student" ? ( */}
                        <div className="flex gap-2 items-center w-fit cursor-pointer">
                          <User2 />
                          <Button variant="link">
                            <Link to="/profile">view profile</Link>
                          </Button>
                        </div>
                        <div className="flex gap-2 items-center w-fit cursor-pointer ">
                          <LogOut />
                          <Button onClick={logoutHandler} variant="link">
                            logout
                          </Button>
                        </div>
                        {/* ) : ( */}
                        <div className="flex gap-2 items-center w-fit cursor-pointer ">
                          <Button variant="link" className="text-red-400">
                            Delete Profile
                          </Button>
                        </div>
                        {/* )} */}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
