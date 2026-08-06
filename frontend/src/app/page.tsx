import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
    </>
  );
}

