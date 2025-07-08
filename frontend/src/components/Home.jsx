import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./categoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeCreateProfile from "./HomeCreateProfile";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role == "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <div className="h-screen bg-Blue">
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
      </div>

      <LatestJobs />
      {!user && <HomeCreateProfile />}

      <Footer />
    </div>
  );
};

export default Home;
