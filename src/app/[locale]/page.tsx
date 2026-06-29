import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CareerJourney from "@/components/CareerJourney/CareerJourney";
import ProblemSection from "@/components/ProblemSection";
import AboutMeSection from "@/components/AboutMeSection";
import ContactTerminal from "@/components/ContactTerminal";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <CareerJourney />
        <SectionDivider />
        <ProblemSection />
        <SectionDivider />
        <AboutMeSection />
        <SectionDivider />
        <ContactTerminal />
      </main>
      <Footer />
    </>
  );
}
