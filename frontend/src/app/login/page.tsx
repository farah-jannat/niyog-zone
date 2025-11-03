"use client";

import Container from "@/components/container";
import AuthWelcome from "@/features/auth/components/auth-welcome";
import LoginForm from "@/features/auth/components/login-form";

const LoginPage = () => {
  return (
    <Container className=" bg-[#F5F6FD] py-16">
      <div className="grid xl:grid-cols-2 gap-20 xl:min-h-[725px] items-center  my-[68px] bg-white rounded-[8px]">
        <AuthWelcome
          title="Welcome Back"
          subTitle="Connect with top companies and grow your career. Discover thousands of verified job listings, build your professional network, and get personalized recommendations that match your skills and ambition."
        />

        <LoginForm />
      </div>
    </Container>
  );
};

export default LoginPage;
