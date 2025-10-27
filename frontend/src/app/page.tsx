import Container from "@/components/container";
import HeroSection from "@/components/hero";

export default function Page() {
  return (
    <div className="bg-[#F5F6FD] ">

hello


      {/* <Navbar /> */}

      <Container className={" bg-gradient"}>
        <HeroSection />
      </Container>

      <Container>
        {/* <LatestJobs /> */}
        <div></div>
      </Container>

      <Container className={"bg-[#FBFBFE]"}>
        {/* {!user && <HomeCreateProfile />} */}
        {/* <HomeCreateProfile/> */}
        <div></div>
      </Container>

      {/* <Footer /> */}
    </div>
  );
}
