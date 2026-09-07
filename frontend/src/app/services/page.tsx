import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/common/ScrollProgress";
import PageTransition from "@/components/common/PageTransition";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Services",
  description: "What I can help you build.",
};

export default function ServicesPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main>
          <ServicesShowcase />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
