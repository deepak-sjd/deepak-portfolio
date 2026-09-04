import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/common/ScrollProgress";
import PageTransition from "@/components/common/PageTransition";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Experience",
  description: "Professional experience and career history.",
};

export default function ExperiencePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main>
          <Experience />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
