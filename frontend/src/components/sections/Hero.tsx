"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowDown,
  FaArrowRight,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import Button from "@/components/ui/Button";

/* ==========================================================================
   Animation choreography
   ========================================================================== */

const container = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-zinc-200/70 bg-white dark:border-zinc-900 dark:bg-zinc-950"
    >
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.30] [background-image:linear-gradient(to_right,rgba(24,24,27,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.035)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-0"
      />

      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 24, -12, 0],
                y: [0, -18, 10, 0],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[42%] top-[-220px] h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-blue-500/[0.055] blur-[130px] dark:bg-blue-500/[0.065]"
      />

      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -20, 14, 0],
                y: [0, 16, -12, 0],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[-260px] right-[-180px] h-[460px] w-[460px] rounded-full bg-indigo-500/[0.035] blur-[130px] dark:bg-indigo-500/[0.04]"
      />

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:grid-cols-[minmax(0,1fr)_380px]"
        >
          {/* ===================================================== */}
          {/* LEFT — INTRODUCTION */}
          {/* ===================================================== */}

          <div className="min-w-0">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2.5 text-[clamp(0.7rem,0.6rem+0.3vw,0.8rem)] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500"
            >
              <motion.span
                aria-hidden="true"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.25, 1],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]"
              />
              AI Engineer
            </motion.div>

            <motion.h1
              variants={item}
              id="hero-heading"
              className="mt-5 max-w-2xl text-[clamp(1.875rem,1rem+2.4vw,3rem)] font-black leading-[1.12] tracking-tight text-zinc-950 dark:text-white"
            >
              Building software that puts{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400">
                intelligence
              </span>{" "}
              to work.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-2xl text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] font-semibold leading-8 text-zinc-800 dark:text-zinc-200"
            >
              AI engineering backed by strong software engineering
              foundations.
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-2xl text-[clamp(0.9rem,0.85rem+0.25vw,1.125rem)] leading-7 text-zinc-600 dark:text-zinc-400 sm:leading-8"
            >
              I build practical AI-powered products and reliable software
              systems designed to solve real problems and work beyond the
              prototype stage.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <a href="/projects" className="w-full sm:w-auto">
                <Button className="group inline-flex w-full items-center justify-center px-6 py-3.5 text-sm font-semibold shadow-lg shadow-blue-600/15 transition-all duration-200 hover:-translate-y-0.5 sm:w-auto">
                  Explore my work
                  <FaArrowRight
                    aria-hidden="true"
                    className="ml-2 text-xs transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              </a>

              <a
                href="/#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950 sm:w-auto"
              >
                Let&apos;s connect
              </a>
            </motion.div>

            {/* ===================================================== */}
            {/* SOCIAL LINKS */}
            {/* ===================================================== */}

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <span className="mr-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                Find me
              </span>

              <a
                href="https://github.com/deepak-sjd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white dark:focus-visible:ring-offset-zinc-950"
              >
                <FaGithub aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/deepak-sjd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-blue-800 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950"
              >
                <FaLinkedin aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/gupta_deepak_74/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm text-zinc-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-pink-800 dark:hover:text-pink-400 dark:focus-visible:ring-offset-zinc-950"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </motion.div>

            {/* ===================================================== */}
            {/* FOOTER / ABOUT LINK */}
            {/* ===================================================== */}

            <motion.div
              variants={item}
              className="mt-14 flex flex-col gap-4 border-t border-zinc-200/80 pt-6 dark:border-zinc-800 sm:mt-16 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
                AI · Software · Engineering
              </p>

              <a
                href="#about"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-blue-600 dark:text-zinc-600 dark:hover:text-blue-400"
              >
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, 3, 0],
                        }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex"
                >
                  <FaArrowDown
                    aria-hidden="true"
                    className="text-[10px]"
                  />
                </motion.span>

                More about my work
              </a>
            </motion.div>
          </div>

          {/* ===================================================== */}
          {/* RIGHT — PORTRAIT */}
          {/* ===================================================== */}

          <motion.div
            variants={item}
            className="relative lg:sticky lg:top-28"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <Image
                src="/images/profile.jpg"
                alt="Portrait of Deepak Kumar"
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                priority
                className="object-cover"
              />

              {/* Corner marks — solid accent color so they read as an
                  intentional framing device rather than fading into
                  whatever tone the photo happens to have at the edges. */}
              <span
                aria-hidden="true"
                className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-blue-500 dark:border-blue-400"
              />

              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-blue-500 dark:border-blue-400"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
