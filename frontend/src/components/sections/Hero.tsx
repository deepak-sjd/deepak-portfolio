"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowDown,
  FaArrowRight,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import Button from "@/components/ui/Button";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="
        relative
        min-h-[calc(100vh-72px)]
        overflow-hidden
        border-b border-zinc-200/70
        bg-white
        dark:border-zinc-900
        dark:bg-zinc-950
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.30]
          [background-image:linear-gradient(to_right,rgba(24,24,27,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.035)_1px,transparent_1px)]
          [background-size:48px_48px]
          dark:opacity-0
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[42%]
          top-[-220px]
          h-[560px]
          w-[760px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.055]
          blur-[130px]
          dark:bg-blue-500/[0.065]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-260px]
          right-[-180px]
          h-[460px]
          w-[460px]
          rounded-full
          bg-indigo-500/[0.035]
          blur-[130px]
          dark:bg-indigo-500/[0.04]
        "
      />

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100vh-72px)]
          max-w-7xl
          items-center
          px-6
          py-20
          sm:py-24
          lg:px-8
          lg:py-28
        "
      >
        <div className="w-full">
          {/* ===================================================== */}
          {/* MAIN INTRODUCTION */}
          {/* ===================================================== */}

          <motion.div
            {...reveal}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="max-w-5xl"
          >
            {/* Small professional label */}

            <motion.div
              {...reveal}
              transition={{
                duration: 0.45,
                delay: 0.05,
                ease: "easeOut",
              }}
              className="
                inline-flex
                items-center
                gap-2.5
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-zinc-500
                dark:text-zinc-500
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_0_4px_rgba(16,185,129,0.10)]
                "
              />

              AI Engineer
            </motion.div>

            {/* Name */}

            <p
              className="
                mt-7
                text-base
                font-semibold
                tracking-tight
                text-zinc-500
                dark:text-zinc-400
                sm:text-lg
              "
            >
              Deepak Kumar
            </p>

            {/* Main heading */}

            <h1
              id="hero-heading"
              className="
                mt-4
                max-w-5xl
                text-[2.75rem]
                font-black
                leading-[0.98]
                tracking-[-0.055em]
                text-zinc-950
                dark:text-white
                sm:text-6xl
                md:text-7xl
                lg:text-[5.4rem]
                xl:text-[6.1rem]
              "
            >
              Building software
              <span className="block">
                that puts{" "}
                <span
                  className="
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-blue-600
                    bg-clip-text
                    text-transparent
                    dark:from-blue-400
                    dark:via-indigo-400
                    dark:to-blue-400
                  "
                >
                  intelligence
                </span>{" "}
                to work.
              </span>
            </h1>

            {/* Positioning */}

            <p
              className="
                mt-8
                max-w-2xl
                text-lg
                font-semibold
                leading-8
                text-zinc-800
                dark:text-zinc-200
                sm:text-xl
              "
            >
              AI engineering backed by strong software engineering
              foundations.
            </p>

            {/* Short value proposition */}

            <p
              className="
                mt-4
                max-w-2xl
                text-base
                leading-8
                text-zinc-600
                dark:text-zinc-400
                sm:text-lg
              "
            >
              I build practical AI-powered products and reliable software
              systems designed to solve real problems and work beyond the
              prototype stage.
            </p>

            {/* ===================================================== */}
            {/* ACTIONS */}
            {/* ===================================================== */}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="/projects">
                <Button
                  className="
                    group
                    inline-flex
                    items-center
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    shadow-lg
                    shadow-blue-600/15
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                  "
                >
                  Explore my work

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
              </a>

              <a
                href="/#contact"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-zinc-200
                  bg-white/80
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-zinc-700
                  shadow-sm
                  backdrop-blur
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-zinc-300
                  hover:text-zinc-950
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-4
                  dark:border-zinc-800
                  dark:bg-zinc-900/70
                  dark:text-zinc-300
                  dark:hover:border-zinc-700
                  dark:hover:text-white
                  dark:focus-visible:ring-offset-zinc-950
                "
              >
                Let&apos;s connect
              </a>
            </div>

            {/* ===================================================== */}
            {/* SOCIAL LINKS */}
            {/* ===================================================== */}

            <div className="mt-10 flex items-center gap-3">
              <span
                className="
                  mr-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-400
                  dark:text-zinc-600
                "
              >
                Find me
              </span>

              {/* GitHub */}

              <a
                href="https://github.com/deepak-sjd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-zinc-200
                  bg-white
                  text-sm
                  text-zinc-500
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-zinc-400
                  hover:text-zinc-950
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-2
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:text-zinc-400
                  dark:hover:border-zinc-600
                  dark:hover:text-white
                  dark:focus-visible:ring-offset-zinc-950
                "
              >
                <FaGithub aria-hidden="true" />
              </a>

              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/in/deepak-sjd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-zinc-200
                  bg-white
                  text-sm
                  text-zinc-500
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-blue-300
                  hover:text-blue-600
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-2
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:text-zinc-400
                  dark:hover:border-blue-800
                  dark:hover:text-blue-400
                  dark:focus-visible:ring-offset-zinc-950
                "
              >
                <FaLinkedin aria-hidden="true" />
              </a>

              {/* Instagram */}

              <a
                href="https://www.instagram.com/gupta_deepak_74/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-zinc-200
                  bg-white
                  text-sm
                  text-zinc-500
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-pink-300
                  hover:text-pink-600
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-pink-500
                  focus-visible:ring-offset-2
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:text-zinc-400
                  dark:hover:border-pink-800
                  dark:hover:text-pink-400
                  dark:focus-visible:ring-offset-zinc-950
                "
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </div>

            {/* ===================================================== */}
            {/* BOTTOM CONTEXT */}
            {/* ===================================================== */}

            <div
              className="
                mt-16
                flex
                flex-col
                gap-4
                border-t
                border-zinc-200/80
                pt-6
                dark:border-zinc-800
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p
                className="
                  text-xs
                  font-medium
                  text-zinc-400
                  dark:text-zinc-600
                "
              >
                AI · Software · Engineering
              </p>

              <a
                href="#about"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-zinc-400
                  transition-colors
                  hover:text-blue-600
                  dark:text-zinc-600
                  dark:hover:text-blue-400
                "
              >
                <FaArrowDown
                  aria-hidden="true"
                  className="
                    text-[10px]
                    transition-transform
                    duration-200
                    group-hover:translate-y-0.5
                  "
                />

                More about my work
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}