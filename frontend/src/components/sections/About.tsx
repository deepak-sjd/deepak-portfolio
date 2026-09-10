"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import Button from "@/components/ui/Button";

const principles = [
  {
    number: "01",
    title: "Systems over demos",
    description:
      "I build things that hold up in production, not just in a pitch or a notebook.",
  },
  {
    number: "02",
    title: "Simplicity is a feature",
    description:
      "The best architecture is the one a team can still understand a year later.",
  },
  {
    number: "03",
    title: "AI is a tool, not the product",
    description:
      "Intelligence should serve the experience, not replace good engineering underneath it.",
  },
  {
    number: "04",
    title: "Ship, then iterate",
    description:
      "Working software in front of real users beats a perfect plan that stays on paper.",
  },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.2,
    },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="
        relative
        overflow-hidden
        border-b
        border-zinc-200/70
        bg-white
        py-24
        dark:border-zinc-900
        dark:bg-zinc-950
        sm:py-28
        lg:py-32
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND ATMOSPHERE */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-1/4
          h-[480px]
          w-[480px]
          rounded-full
          bg-indigo-500/[0.045]
          blur-[130px]
          dark:bg-indigo-500/[0.055]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-220px]
          left-[-140px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/[0.035]
          blur-[120px]
          dark:bg-blue-500/[0.04]
        "
      />

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ======================================================= */}
        {/* SECTION INTRO */}
        {/* ======================================================= */}

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left — section heading */}

          <motion.div
            {...reveal}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-8
                  bg-blue-600
                  dark:bg-blue-400
                "
              />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-blue-600
                  dark:text-blue-400
                "
              >
                About
              </span>
            </div>

            <h2
              id="about-heading"
              className="
                mt-6
                max-w-xl
                text-4xl
                font-black
                leading-[1.05]
                tracking-[-0.035em]
                text-zinc-950
                dark:text-white
                sm:text-5xl
                lg:text-[3.4rem]
              "
            >
              Engineering AI systems
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-600
                  to-cyan-600
                  bg-clip-text
                  text-transparent
                  dark:from-blue-400
                  dark:via-indigo-400
                  dark:to-cyan-400
                "
              >
                that work in practice.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-md
                text-sm
                leading-7
                text-zinc-500
                dark:text-zinc-400
              "
            >
              I approach AI as an engineering problem — combining intelligent
              capabilities with the software foundations required to make
              applications useful, maintainable, and dependable.
            </p>
          </motion.div>

          {/* Right — About content */}

          <motion.div
            {...reveal}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: "easeOut",
            }}
          >
            {/* ===================================================== */}
            {/* DESCRIPTION */}
            {/* ===================================================== */}

            <div
              className="
                max-w-3xl
                space-y-5
                text-[15px]
                leading-8
                text-zinc-600
                dark:text-zinc-400
                sm:text-base
              "
            >
              <p>
                I&apos;m an AI Engineer with a software engineering
                background, focused on building applications where AI is part
                of the product rather than an isolated experiment.
              </p>

              <p>
                My work spans generative AI, retrieval-based applications,
                computer vision, backend services, and modern web products. I
                focus on turning models and technical ideas into systems that
                can actually be integrated, maintained, and used.
              </p>

              <p>
                I enjoy working across the stack — from designing APIs and
                application architecture to connecting AI capabilities with
                interfaces that make complex systems easier to understand and
                use.
              </p>
            </div>

            {/* ===================================================== */}
            {/* ENGINEERING AREAS */}
            {/* ===================================================== */}

            <div className="mt-12">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-zinc-400
                    dark:text-zinc-600
                  "
                >
                  How I think about engineering
                </span>

                <span
                  aria-hidden="true"
                  className="
                    h-px
                    w-12
                    bg-zinc-200
                    dark:bg-zinc-800
                  "
                />
              </div>

              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {principles.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 14,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : index * 0.06,
                      ease: "easeOut",
                    }}
                    className="group flex items-start gap-5 py-5 first:pt-0 last:pb-0"
                  >
                    <span
                      className="
                        shrink-0
                        font-mono
                        text-sm
                        font-bold
                        text-zinc-300
                        transition-colors
                        duration-300
                        group-hover:text-blue-500
                        dark:text-zinc-700
                        dark:group-hover:text-blue-400
                      "
                    >
                      {principle.number}
                    </span>

                    <div>
                      <h3
                        className="
                          text-sm
                          font-bold
                          text-zinc-950
                          dark:text-white
                        "
                      >
                        {principle.title}
                      </h3>

                      <p
                        className="
                          mt-1.5
                          max-w-xl
                          text-sm
                          leading-6
                          text-zinc-500
                          dark:text-zinc-400
                        "
                      >
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ===================================================== */}
            {/* CLOSING STATEMENT */}
            {/* ===================================================== */}

            <div
              className="
                mt-12
                flex
                flex-col
                gap-5
                border-t
                border-zinc-200
                pt-7
                dark:border-zinc-800
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p
                className="
                  max-w-xl
                  text-sm
                  leading-6
                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                The goal is simple: build technology that is intelligent,
                reliable, and useful.
              </p>

              <div className="shrink-0">
                <Button
                  href="/resume"
                  variant="secondary"
                  className="group inline-flex items-center"
                >
                  View Resume

                  <FaArrowRight
                    aria-hidden="true"
                    className="
                      ml-2
                      text-xs
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                    "
                  />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}