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

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
    >
      {/* Ambient background — matches Skills/Schedule */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-160px] top-1/4 h-96 w-96 rounded-full bg-indigo-500/[0.05] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-200px] left-[-140px] h-96 w-96 rounded-full bg-blue-500/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — same pattern as every other section */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              About
            </span>
          </div>

          <h2
            id="about-heading"
            className="mt-4 text-3xl font-black leading-[1.1] tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Engineering AI systems{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
              that work in practice.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
            I&apos;m an AI Engineer with a software engineering background,
            focused on building applications where AI is part of the product
            rather than an isolated experiment.
          </p>
        </motion.div>

        {/* Bridge line — points to Skills/Projects instead of re-listing them */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-6 max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-500"
        >
          The specifics — languages, frameworks, and tools — live in{" "}
          <a href="/skills" className="font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-2 hover:text-blue-600 hover:decoration-blue-400 dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:text-blue-400">
            Skills
          </a>
          , and what I&apos;ve actually shipped lives in{" "}
          <a href="/projects" className="font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-2 hover:text-blue-600 hover:decoration-blue-400 dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:text-blue-400">
            Projects
          </a>
          . This is about how I approach the work.
        </motion.p>

        {/* Principles */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 divide-y divide-zinc-200 dark:divide-zinc-800"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: shouldReduceMotion ? 0 : index * 0.05,
                ease: "easeOut",
              }}
              className="group flex items-start gap-5 py-4 first:pt-0 last:pb-0"
            >
              <span className="shrink-0 font-mono text-sm font-bold text-zinc-300 transition-colors duration-300 group-hover:text-blue-500 dark:text-zinc-700 dark:group-hover:text-blue-400">
                {principle.number}
              </span>
              <div>
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  {principle.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing statement — matches Skills' closing row exactly */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
              The goal is simple: build technology that is intelligent,
              reliable, and useful.
            </p>

            <Button
              href="/resume"
              variant="secondary"
              className="group inline-flex w-fit shrink-0 items-center"
            >
              View Resume
              <FaArrowRight
                aria-hidden="true"
                className="ml-2 text-xs transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
