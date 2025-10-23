import Container from "@/components/container";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

const LoginPage = () => {
  return (
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

          <div className="text-[#03050F]  xl:pr-6 text-[16px] flex flex-col gap-[42px] items-start">
            <div className="flex flex-col gap-5 items-start">
              <h2 className="text-[40px]">Sign In</h2>
              <p>
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#A1DD5F] underline">
                  sign up
                </Link>
              </p>
            </div>
            <form
              onSubmit={submitHandler}
              className="w-full text-[#03050F] text-[16px] grid  gap-[34px]"
            >
              <div className="grid gap-2 ">
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

              <div className="grid gap-2">
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
                <Button className="font-medium  py-2.5 px-10 bg-[#287992] text-[#F5F6FD]  w-full my-4  hover:bg-[#216377] hover:text-white">
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
};

export default LoginPage;
