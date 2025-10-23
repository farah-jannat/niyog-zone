import React, { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Button } from "../../../components/ui/button";
import Navbar from "../../../components/widgets/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import store from "@/redux/store";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Navbar_two from "../../../components/widgets/Navbar_two";
import { REGISTER_USER } from "@/graphql/mutation/register";
import Container from "../../../components/container";
import Footer from "../../../components/widgets/footer";

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
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setInput({ ...input, file: reader.result });
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    } else {
      setInput({ ...input, file: null }); // Clear file if no file is selected
    }
  };

  const [register, { loading, data, error }] = useMutation(REGISTER_USER);
  return (
    <>
      <div className="bg-[#F5F6FD]">
        <Navbar />
        <Container className=" bg-[#FEFEFF]">
          <div className="grid xl:grid-cols-2 gap-20 min-h-[725px] items-center  my-[68px] pt-2 pl-2 pb-2">
            <div className="hidden  xl:flex flex-col items-center h-full justify-center  gap-[22px] text-[#35373F] text-[16px] rounded-xl card-gradient-bluish bg-[#EAF2F4]">
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
                <h2 className="text-[40px]">Sign Up</h2>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#A1DD5F] underline">
                    sign in
                  </Link>
                </p>
              </div>
              <form
                onSubmit={submitHandler}
                className="w-full text-[#03050F] text-[16px] grid  md:grid-cols-12 gap-[34px]"
              >
                <div className="grid gap-2 md:col-span-6">
                  <Label className="font-normal text-[#03050F]">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="your name"
                    value={input.fullName}
                    name="fullName"
                    onChange={changeEvenHandler}
                    className="bg-[#FBFBFE]"
                  />
                </div>
                <div className=" grid gap-2 md:col-span-6">
                  <Label className="font-normal text-[#03050F]">Email</Label>
                  <Input
                    type="email"
                    placeholder="farah@gmail.com"
                    value={input.email}
                    name="email"
                    onChange={changeEvenHandler}
                    className="bg-[#FBFBFE]"
                  />
                </div>
                <div className="grid gap-2 md:col-span-6">
                  <Label className="font-normal text-[#03050F]">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    placeholder="987987987987"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEvenHandler}
                    className="bg-[#FBFBFE]"
                  />
                </div>
                <div className=" grid gap-2 md:col-span-6">
                  <Label className="font-normal text-[#03050F]">Password</Label>
                  <Input
                    type="password"
                    placeholder="farah"
                    value={input.password}
                    name="password"
                    onChange={changeEvenHandler}
                    className="bg-[#FBFBFE]"
                  />
                </div>
                <div className="flex items-center justify-between  md:col-span-6">
                  <RadioGroup
                    defaultValue="comfortable"
                    className="flex items-center gap-4 "
                  >
                    <div className="flex items-center space-x-2 ">
                      <Input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role == "student"}
                        onChange={changeEvenHandler}
                        className="cursor-pointer bg-[#FBFBFE]"
                      />
                      <Label
                        htmlFor="r1"
                        className="font-normal text-[#03050F]"
                      >
                        Student
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 md:col-span-6">
                      <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role == "recruiter"}
                        className="cursor-pointer bg-[#FBFBFE]"
                        onChange={changeEvenHandler}
                      />
                      <Label
                        htmlFor="r1"
                        className="font-normal text-[#03050F]"
                      >
                        Recruiter
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center gap-5 md:col-span-6">
                  <Label className="font-normal text-[#03050F]">Profile</Label>
                  <Input
                    accept="image/*"
                    type="file"
                    className="cursor-pointer bg-[#FBFBFE]"
                    onChange={changeFileHandler}
                  />
                </div>
                {loading ? (
                  <Button className="font-medium md:col-span-12 py-2.5 px-10 bg-[#287992] text-[#F5F6FD]">
                    <Loader2 className=" font-medium   " />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className=" font-medium  w-full md:col-span-12 bg-[#287992] text-[#F5F6FD]"
                  >
                    Signup
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
    </>
  );

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

  async function submitHandler(e) {
    e.preventDefault();

    // dispatch(setLoading(true));
    // console.log("######################", input);
    await register({
      variables: {
        // registerInput: {
        fullName: input.fullName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: input.password,
        role: input.role,
        profilePhoto: input.file,
        // },
      },

      onCompleted: (result) => {
        // console.log("Specific mutation completed:", result);
        toast.success("Registration successful! Please log in.");
        dispatch(setUser(data.register));

        navigate("/login");
      },
      onError: (err) => {
        toast.error(error.message);

        // console.error("Specific mutation failed:", err);
      },
    });
  }
};

export default Signup;

// useEffect(() => {
//   if (loading) {
//     console.log("Registering user...");
//     dispatch(setLoading(true));
//   } else {
//     dispatch(setLoading(false));
//   }

//   if (data && data.register) {
//     console.log("Registration successful:", data.register);
//     toast.success("Registration successful! Please log in.");
//     dispatch(setUser(data.register));
//     navigate("/login");
//   }

//   if (error) {
//     console.error("Error registering user (GraphQL error):", error.message);
//     toast.error(`Registration failed: ${error.message}`);
//   }
// }, [loading, data, error, navigate, dispatch]);
