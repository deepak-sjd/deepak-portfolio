"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

/* ==========================================================================
   Content
   ========================================================================== */

const domainTags = ["AI Engineering", "Backend Systems", "Product Thinking"];

const principles = [
  {
    number: "01",
    title: "Keep it working",
    description: "Code that actually runs beats code that just looks clever.",
  },
  {
    number: "02",
    title: "Keep it simple",
    description: "Simple solutions are easier to build on later.",
  },
  {
    number: "03",
    title: "AI as a tool",
    description: "It should help the product, not be the whole point.",
  },
  {
    number: "04",
    title: "Learn by building",
    description: "I pick things up fastest by actually shipping them.",
  },
];

const links = [
  {
    label: "Skills",
    description: "Languages, frameworks, and the tools I actually use day to day.",
    href: "/skills",
  },
  {
    label: "Projects",
    description: "Real systems I've designed, built, and shipped end to end.",
    href: "/projects",
  },
  {
    label: "Resume",
    description: "Want the full picture? Grab the PDF or reach out directly.",
    href: "/resume",
  },
];

/* ==========================================================================
   Animation
   ========================================================================== */

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ==========================================================================
   Component
   ========================================================================== */

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
    >
      {/* Ambient background — matches Skills/Schedule/Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-160px] top-1/4 h-96 w-96 rounded-full bg-indigo-500/[0.05] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-200px] left-[-140px] h-96 w-96 rounded-full bg-blue-500/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span aria-hidden="true" className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
            About
          </span>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2"
        >
          {/* Intro — large anchor tile */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900 sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:p-9"
          >
            <h2
              id="about-heading"
              className="max-w-lg text-2xl font-black leading-[1.15] tracking-tight text-zinc-950 dark:text-white sm:text-3xl lg:text-4xl"
            >
              Engineering AI systems{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
                that work in practice.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              I&apos;m an AI Engineer with a software engineering background,
              building applications where AI is part of the product — not
              just a demo bolted on top.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {domainTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Currently — mirrors Hero's Live Status language */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-5"
          >
            <div className="flex items-center gap-2">
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-600">
                Currently
              </span>
            </div>
            <p className="mt-3 text-sm font-bold text-zinc-950 dark:text-white">
              AI Engineer, based in Chennai, India.
            </p>
            <p className="mt-1.5 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Focused on generative AI and backend systems right now.
            </p>
          </motion.div>

          {/* Quote — visually distinct accent tile */}
          <motion.div
            variants={item}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 dark:from-blue-500 dark:to-indigo-600 lg:col-span-5"
          >
            <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-6 text-8xl font-black text-white/10">
              &rdquo;
            </span>
            <p className="relative text-base font-bold leading-7 text-white sm:text-lg">
              I care more about building things that actually work than
              things that just look good in a demo.
            </p>
          </motion.div>

          {/* Principles — compact tiles */}
          {principles.map((principle) => (
            <motion.div
              key={principle.number}
              variants={item}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              className="rounded-2xl border border-zinc-200 bg-white p-5 transition-colors duration-300 hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900 sm:col-span-1 lg:col-span-3"
            >
              <span className="font-mono text-xs font-bold text-zinc-300 dark:text-zinc-700">
                {principle.number}
              </span>
              <h3 className="mt-2 text-sm font-bold text-zinc-950 dark:text-white">
                {principle.title}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-500">
                {principle.description}
              </p>
            </motion.div>
          ))}

          {/* Link-out tiles — point to Skills/Projects/Resume instead of repeating them */}
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              variants={item}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 transition-colors duration-300 hover:border-blue-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-900 sm:col-span-2 lg:col-span-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {link.label}
                  </h3>
                  <FaArrowRight
                    aria-hidden="true"
                    className="text-xs text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-zinc-700 dark:group-hover:text-blue-400"
                  />
                </div>
                <p className="mt-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-500">
                  {link.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
