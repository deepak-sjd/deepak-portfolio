import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/common/ScrollProgress";
import PageTransition from "@/components/common/PageTransition";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Skills",
  description:
    "Technical skills and tools — AI engineering, backend systems, and modern web development.",
};

export default function SkillsPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main>
          <Skills />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
