import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SkillMatrix from "@/components/SkillMatrix";
import ProjectGallery from "@/components/ProjectGallery";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <HeroSection />
      <SkillMatrix />
      <ProjectGallery />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
