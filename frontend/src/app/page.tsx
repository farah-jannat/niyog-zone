import Container from "@/components/container";
import HeroSection from "@/components/hero";
import HomeCreateProfile from "@/components/how-it-works";
import LatestJobs from "@/components/LatestJobs";

export default function Page() {
  return (
    <div className="bg-[#F5F6FD] ">
      {/* <Navbar /> */}

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

      {/* <Footer /> */}
    </div>
  );
}
