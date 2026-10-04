"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaBook,
  FaFileAlt,
  FaTools,
} from "react-icons/fa";

/* ==========================================================================
   Content
   ========================================================================== */

const domainTags = ["AI Engineering", "Backend Systems", "Product Thinking"];

/*
 * Each of these is a real destination page, not homepage content — so they
 * render as proper button-style cards below, each with its own icon.
 */
const links = [
  {
    label: "Experience & Education",
    description: "Where I've worked and studied — roles, degree, and what came of each.",
    href: "/experience",
    icon: FaBriefcase,
  },
  {
    label: "Services",
    description: "What I can help you build, from prototype to production.",
    href: "/services",
    icon: FaTools,
  },
  {
    label: "Notes",
    description: "A structured knowledge base of everything I study and work with.",
    href: "/notes",
    icon: FaBook,
  },
  {
    label: "Resume",
    description: "Want the full picture? Grab the PDF or reach out directly.",
    href: "/resume",
    icon: FaFileAlt,
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

            {/* Currently — this comes from the admin/backend content, kept
                as the single place this fact is stated (not repeated in the
                profile card on the right) */}
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

            {/* Pull-quote */}
            <p className="mt-7 border-l-[3px] border-blue-500 pl-4 text-lg font-semibold italic leading-7 text-zinc-700 dark:text-zinc-300">
              &ldquo;I care more about building things that actually work than
              things that just look good in a demo.&rdquo;
            </p>
          </div>

          {/* Links — a compact vertical list filling the space beside the
              intro text, instead of a separate full-width row that pushed
              the section taller than one screen */}
          <div className="lg:col-span-5">
            <div className="flex flex-col divide-y divide-zinc-200 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-4 p-4 transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                  >
                    <div
                      className="
                        flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                        bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300
                        group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600
                        dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-900/50
                      "
                    >
                      <Icon aria-hidden="true" className="text-sm" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-zinc-950 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {link.label}
                      </h3>
                      <p className="mt-0.5 truncate text-[13px] leading-5 text-zinc-500 dark:text-zinc-500">
                        {link.description}
                      </p>
                    </div>

                    <FaArrowRight
                      aria-hidden="true"
                      className="shrink-0 text-xs text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-zinc-700"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
