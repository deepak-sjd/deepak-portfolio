"use client";

import { useEffect } from "react";

import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Services from "./Services";
import Notes from "./Notes";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
  useEffect(() => {
    /*
     * Only restore the scroll position when
     * returning from a note detail page.
     */
    const target = sessionStorage.getItem(
      "portfolio-scroll-target"
    );

    if (target !== "notes") {
      return;
    }

    /*
     * Remove the target immediately.
     * This prevents refresh from scrolling back
     * to Notes again.
     */
    sessionStorage.removeItem(
      "portfolio-scroll-target"
    );

    /*
     * Prevent browser automatic scroll restoration
     * from interfering with our own restoration.
     */
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    /*
     * Wait until React has rendered the complete
     * Home page and the Notes section exists.
     */
    let frame = 0;

    const scrollToNotes = () => {
      const notesSection =
        document.getElementById("notes");

      if (!notesSection) {
        /*
         * Notes is not available yet.
         * Try again on the next browser frame.
         */
        frame = window.requestAnimationFrame(
          scrollToNotes
        );

        return;
      }

      /*
       * Notes section exists.
       */
      notesSection.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    };

    frame = window.requestAnimationFrame(
      scrollToNotes
    );

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Notes />
      <Contact />
      <Footer />
    </>
  );
}