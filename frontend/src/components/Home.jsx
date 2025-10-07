import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./hero";
import CategoryCarousel from "./categoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeCreateProfile from "./HomeCreateProfile";
import Container from "./container";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user?.role == "recruiter") {
  //     navigate("/admin/companies");
  //   }
  // }, []);

  return (
    <div className="bg-[#F5F6FD] ">
      <Navbar />

      <Container className={" bg-gradient"}>
        <HeroSection />
      </Container>

      <Container>
        <LatestJobs />
      </Container>

      <Container className={"bg-[#FBFBFE]"}>
        {/* {!user && <HomeCreateProfile />} */}
        <HomeCreateProfile/>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
