import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Bell, LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar_two = () => {
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
    <div className="w-[full] shadow-sm">
      <div className="flex justify-between items-center w-[80%] mx-auto h-16 text-Black ">
        <div>
          <h1 className="text-2xl font-bold text-Black">
            Niyog<span className="text-Blue">Zone</span>
          </h1>
        </div>

        <div>
          <ul className="hidden md:flex font-medium items-center  gap-7">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Find a job</Link>
                </li>
                <li>
                  <Link to="/browse">My Network</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-Blue">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div className="relative">
                <Bell size={28} />
                <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
                  1
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-start">
                <h2 className="font-semibold">Emma W</h2>
                <h1 className="text-sm text-gray-500">Recruiter</h1>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={user?.Profile?.profilePhoto}
                      alt="@shadcn"
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
                      <>
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
                      </>
                      {/* ) : ( */}

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
  );
};

export default Navbar_two;
