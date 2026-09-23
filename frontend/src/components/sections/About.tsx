"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

/* ==========================================================================
   Content
   ========================================================================== */

const domainTags = ["AI Engineering", "Backend Systems", "Product Thinking"];

const principles = [
  {
    title: "Keep it working",
    description: "Code that actually runs beats code that just looks clever.",
  },
  {
    title: "Keep it simple",
    description: "Simple solutions are easier to build on later.",
  },
  {
    title: "AI as a tool",
    description: "It should help the product, not be the whole point.",
  },
  {
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
   Component
   ========================================================================== */

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
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

        {/* One orchestrated reveal for the whole block — not a stagger per tile */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
          className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12"
        >
          {/* Intro */}
          <div className="lg:col-span-7">
                        <h2
              id="about-heading"
              className="max-w-xl font-serif text-3xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-4xl"
            >
              Engineering AI systems{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
                that work in practice.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-600 dark:text-zinc-400">
              I&apos;m an AI Engineer with a software engineering background,
              building applications where AI is part of the product — not
              just a demo bolted on top.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {domainTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Currently — folded into the intro instead of a duplicate bordered box */}
            <div className="mt-8 flex items-center gap-2.5 border-t border-zinc-200 pt-6 dark:border-zinc-800">
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
              />
              <p className="font-mono text-[13px] text-zinc-500 dark:text-zinc-400">
                Currently based in Chennai, India — focused on generative AI
                and backend systems.
              </p>
            </div>
          </div>

          {/* Quote — the one bold, deliberate accent in the section */}
          <div className="lg:col-span-5">
            <div className="relative flex h-full min-h-[220px] flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 dark:from-blue-500 dark:to-indigo-600">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-10 text-[10rem] font-black leading-none text-white/10"
              >
                &rdquo;
              </span>
              <p className="relative text-xl font-bold leading-8 text-white sm:text-[1.375rem] sm:leading-9">
                I care more about building things that actually work than
                things that just look good in a demo.
              </p>
            </div>
          </div>

          {/* Principles — an editorial list, not four repeated cards */}
          <div className="lg:col-span-12 border-t border-zinc-200 pt-10 dark:border-zinc-800">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-5 text-zinc-500 dark:text-zinc-500">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Links — a minimal nav row instead of duplicate bordered cards */}
          <div className="lg:col-span-12 border-t border-zinc-200 pt-10 dark:border-zinc-800">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-start justify-between gap-3"
                >
                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {link.label}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-5 text-zinc-500 dark:text-zinc-500">
                      {link.description}
                    </p>
                  </div>
                  <FaArrowRight
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-xs text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-zinc-700 dark:group-hover:text-blue-400"
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
