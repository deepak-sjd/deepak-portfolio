import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/common/ScrollProgress";
import PageTransition from "@/components/common/PageTransition";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Projects",
  description:
    "A selection of projects — AI-powered products, backend systems, and web applications.",
};

export default function ProjectsPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main>
          <Projects />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
