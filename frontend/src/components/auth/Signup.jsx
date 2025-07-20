import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Navbar_two from "../shared/Navbar_two";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/graphql/mutation/register";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEvenHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });

    
  };

  

  const [register, { loading, data, error }] = useMutation(REGISTER_USER);

  const submitHandler = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("fullName", input.fullName);
    // formData.append("email", input.email);
    // formData.append("phoneNumber", input.phoneNumber);
    // formData.append("password", input.password);
    // formData.append("role", input.role);
    // if (input.file) {
    //   formData.append("file", input.file);
    // }
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    try {
      dispatch(setLoading(true));
      console.log("######################", input);
      const registerResult = await register({
        variables: {
          registerInput: {
            fullName: input.fullName,
            email: input.email,
            phoneNumber: input.phoneNumber,
            password: input.password,
            role: input.role,
            profilePhoto: input.file,
          },
        },
      });

      // const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      //   withCredentials: true,
      // });
      // console.log("After axios.post has resolved, before console.log(res)");
      // console.log("res if tere is any eroor or not", res);
      // if (res.data.success) {
      //   navigate("/login");
      //   toast.success(res.data.message);
      // }
    } catch (error) {
      console.log("error form signup page", error.message);
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (loading) {
      console.log("Registering user...");
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (data && data.register) {
      console.log("Registration successful:", data.register);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    }

    if (error) {
      console.error("Error registering user (GraphQL error):", error.message);
      toast.error(`Registration failed: ${error.message}`);
    }
  }, [loading, data, error, navigate, dispatch]);

  return (
    <div>
      <Navbar_two />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="your name"
              value={input.fullName}
              name="fullName"
              onChange={changeEvenHandler}
            />
          </div>
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
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="987987987987"
              value={input.phoneNumber}
              name="phoneNumber"
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
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}

          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-600">
              {" "}
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
