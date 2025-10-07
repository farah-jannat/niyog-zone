import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import Navbar_two from "../shared/Navbar_two";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/mutation/login";
import Container from "../container";
import Footer from "../shared/Footer";

const Login = () => {
  const [input, setInput] = useState({
    email: "mim123@gmail.com",
    password: "mim",
    role: "student",
  });
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEvenHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const [login, { loading, error, data }] = useMutation(LOGIN_USER);
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7777777777777", data);

  return (
    <div className="bg-[#F5F6FD]">
      <Navbar />
      <Container className=" bg-[#FEFEFF]">
        <div className="grid xl:grid-cols-2 gap-[80px] min-h-[725px] items-center  my-[68px] pt-[8px] pl-[8px] pb-[8px]">
          <div className="hidden  xl:flex flex-col items-center h-full justify-center  gap-[22px] text-[#35373F] text-[16px] rounded-[8px] card-gradient-bluish bg-[#EAF2F4]">
            {/* <div className="rounded-full w-[223px] h-[223px] bg-[#F6FCEF] absolute bottom-10 left-0 overflow-hidden"></div> */}
            <h3 className="text-[40px] font-bold">Welcome</h3>
            <p className="max-w-[431px] text-center">
              Connect with top companies and grow your career. Discover
              thousands of verified job listings, build your professional
              network, and get personalized recommendations that match your
              skills and ambition.
            </p>
          </div>

          <div className="text-[#03050F]  xl:pr-[24px] text-[16px] flex flex-col gap-[42px] items-start">
            <div className="flex flex-col gap-[20px] items-start">
              <h2 className="text-[40px]">Sign In</h2>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#A1DD5F] underline">
                  sign up
                </Link>
              </p>
            </div>
            <form
              onSubmit={submitHandler}
              className="w-full text-[#03050F] text-[16px] grid  gap-[34px]"
            >
              <div className="grid gap-[8px] ">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="farah@gmail.com"
                  value={input.email}
                  name="email"
                  onChange={changeEvenHandler}
                  className="bg-[#FBFBFE]"
                />
              </div>

              <div className="grid gap-[8px]">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="farah"
                  value={input.password}
                  name="password"
                  onChange={changeEvenHandler}
                  className="bg-[#FBFBFE]"
                />
              </div>

              <div className="flex items-center justify-between ">
                <RadioGroup
                  defaultValue="comfortable"
                  className="flex items-center gap-4 my-5"
                >
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role == "student"}
                      onChange={changeEvenHandler}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="r1">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role == "recruiter"}
                      className="cursor-pointer"
                      onChange={changeEvenHandler}
                    />
                    <Label htmlFor="r1">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>
              {loading ? (
                <Button className="font-medium  py-[10px] px-[40px] bg-[#287992] text-[#F5F6FD]  w-full my-4  hover:bg-[#216377] hover:text-white">
                  <Loader2 className=" font-medium   " />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className=" font-medium  w-full  bg-[#287992] text-[#F5F6FD]"
                >
                  Sign In
                </Button>
              )}

              {/* <span className="text-sm">
                Already have an account?
                <Link to="/login" className="text-blue-600">
                  {" "}
                  Login
                </Link>
              </span> */}
            </form>{" "}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
  return (
    <div>
      <Navbar_two />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="farah"
              value={input.password}
              name="password"
              onChange={changeEvenHandler}
            />
          </div>
          <div className="flex items-center justify-between ">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center gap-4 my-5"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEvenHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  className="cursor-pointer"
                  onChange={changeEvenHandler}
                />
                <Label htmlFor="r1">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-600">
              {" "}
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );

  async function submitHandler(e) {
    e.preventDefault();
    await login({
      variables: {
        email: input.email,
        password: input.password,
        role: input.role,
      },

      onCompleted: (result) => {
        console.log("login successful ******************:", result);
        toast.success(
          `login successful! welcome back ${result.login?.fullName} `
        );
        dispatch(setUser(result.login));
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.message);

        // console.error("Specific mutation failed:", err);
      },
    });
  }
};

export default Login;
