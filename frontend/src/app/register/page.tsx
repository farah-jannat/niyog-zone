"use client";

import Container from "@/components/container";
import AuthWelcome from "@/features/auth/components/auth-welcome";
import RegisterForm from "@/features/auth/components/register-form";

const RegisterPage = () => {
  return (
    <Container className=" bg-[#F5F6FD] py-16">
      <div className="grid xl:grid-cols-2 gap-20 min-h-[725px] items-center  my-[68px] pt-2 pl-2 pb-2 bg-white rounded-[8px]">
        <AuthWelcome
          title="Welcome"
          subTitle="Connect with top companies and grow your career. Discover thousands of verified job listings, build your professional network, and get personalized recommendations that match your skills and ambition."
        />
        <RegisterForm />
      </div>
    </Container>
  );
};

export default RegisterPage;
