import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AboutMeSection from "@/components/AboutMeSection";
import SkillsGrid from "@/components/SkillsGrid";
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
        <ProblemSection />
        <SectionDivider />
        <AboutMeSection />
        <SectionDivider />
        <SkillsGrid />
        <SectionDivider />
        <ContactTerminal />
      </main>
      <Footer />
    </>
  );
}
