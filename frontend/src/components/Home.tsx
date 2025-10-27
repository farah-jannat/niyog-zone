import Container from "@/components/container";
import HeroSection from "@/components/hero";
import HomeCreateProfile from "@/components/how-it-works";
import LatestJobs from "@/components/LatestJobs";
import Footer from "@/components/widgets/footer";
import Navbar from "@/components/widgets/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);

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
        <HomeCreateProfile />
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
