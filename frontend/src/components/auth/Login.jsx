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
    <div>
      <Navbar_two />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="farah@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEvenHandler}
            />
          </div>

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
