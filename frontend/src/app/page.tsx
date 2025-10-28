import Container from "@/components/container";
import HeroSection from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Footer from "@/components/widgets/footer";
import LatestJobList from "@/features/job/components/latest-job-list";

export default function Page() {
  return (
    <div className="bg-[#F5F6FD] ">
      {/* <Navbar /> */}

      <Container className={"bg-gradient"}>
        <HeroSection />
      </Container>

      <Container>
        <LatestJobList />
      </Container>

      <Container className={"bg-[#FBFBFE]"}>
        <HowItWorks />
      </Container>

      <Footer />
    </div>
  );
}
