"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowDown,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import Button from "@/components/ui/Button";

const profilePoints = [
  {
    value: "AI",
    label: "Engineering",
  },
  {
    value: "Java",
    label: "Backend",
  },
  {
    value: "Web",
    label: "Products",
  },
];

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
          opacity-[0.35]
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
          left-[48%]
          top-[-180px]
          h-[520px]
          w-[720px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.055]
          blur-[120px]
          dark:bg-blue-500/[0.07]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-220px]
          right-[-120px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-indigo-500/[0.035]
          blur-[120px]
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
        <div
          className="
            grid
            w-full
            items-center
            gap-16
            lg:grid-cols-[1.12fr_0.88fr]
            lg:gap-20
          "
        >
          {/* ===================================================== */}
          {/* LEFT — PRIMARY INTRODUCTION */}
          {/* ===================================================== */}

          <motion.div
            {...reveal}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="max-w-3xl"
          >
            {/* Role indicator */}

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
                rounded-full
                border
                border-zinc-200
                bg-white/80
                px-4
                py-2
                text-xs
                font-semibold
                text-zinc-600
                shadow-sm
                backdrop-blur
                dark:border-zinc-800
                dark:bg-zinc-900/70
                dark:text-zinc-300
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_0_4px_rgba(16,185,129,0.10)]
                "
              />

              AI Engineer
            </motion.div>

            {/* Main heading */}

            <h1
              id="hero-heading"
              className="
                mt-7
                max-w-4xl
                text-[2.8rem]
                font-black
                leading-[0.98]
                tracking-[-0.045em]
                text-zinc-950
                dark:text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[4.5rem]
                xl:text-[5rem]
              "
            >
              I build software
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
                mt-7
                max-w-2xl
                text-lg
                font-semibold
                leading-8
                text-zinc-800
                dark:text-zinc-200
                sm:text-xl
              "
            >
              AI engineering with strong software foundations.
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
              I design and build practical AI applications, backend systems,
              and modern web products with a focus on reliability,
              maintainability, and real-world use.
            </p>

            {/* Actions */}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#projects">
                <Button
                  className="
                    group
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
                href="#contact"
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

            {/* Social / professional links */}

            <div className="mt-10 flex items-center gap-4">
              <span
                className="
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

            {/* Scroll cue */}

            <a
              href="#about"
              className="
                mt-14
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
                className="text-[10px]"
              />

              More about my work
            </a>
          </motion.div>

          {/* ===================================================== */}
          {/* RIGHT — ENGINEERING IDENTITY CARD */}
          {/* ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 28,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: "easeOut",
            }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[390px]">
              {/* Card atmosphere */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  -inset-6
                  rounded-[2.5rem]
                  bg-blue-500/[0.08]
                  blur-3xl
                  dark:bg-blue-500/[0.08]
                "
              />

              {/* Card */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-zinc-200/80
                  bg-white/90
                  p-7
                  shadow-[0_30px_80px_-35px_rgba(24,24,27,0.30)]
                  backdrop-blur-xl
                  dark:border-zinc-800
                  dark:bg-zinc-900/90
                  dark:shadow-black/30
                  sm:p-8
                "
              >
                {/* Top accent */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-blue-500
                    to-transparent
                  "
                />

                {/* Header */}

                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-zinc-400
                        dark:text-zinc-600
                      "
                    >
                      Engineering profile
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-zinc-500
                        dark:text-zinc-400
                      "
                    >
                      AI · Systems · Products
                    </p>
                  </div>

                  <span
                    className="
                      rounded-full
                      border
                      border-blue-100
                      bg-blue-50
                      px-3
                      py-1.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-blue-600
                      dark:border-blue-900/50
                      dark:bg-blue-950/30
                      dark:text-blue-400
                    "
                  >
                    AI Engineer
                  </span>
                </div>

                {/* Identity */}

                <div className="mt-10 text-center">
                  <div
                    className="
                      mx-auto
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-[1.75rem]
                      bg-gradient-to-br
                      from-blue-600
                      via-indigo-600
                      to-violet-600
                      text-2xl
                      font-black
                      tracking-tight
                      text-white
                      shadow-xl
                      shadow-blue-500/20
                    "
                  >
                    DK
                  </div>

                  <h2
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      tracking-tight
                      text-zinc-950
                      dark:text-white
                    "
                  >
                    Deepak Kumar
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-semibold
                      text-blue-600
                      dark:text-blue-400
                    "
                  >
                    AI Engineer · Software Developer
                  </p>
                </div>

                {/* Divider */}

                <div
                  aria-hidden="true"
                  className="
                    my-8
                    h-px
                    bg-zinc-200
                    dark:bg-zinc-800
                  "
                />

                {/* Three engineering dimensions */}

                <div className="grid grid-cols-3 gap-2.5">
                  {profilePoints.map((item) => (
                    <div
                      key={item.value}
                      className="
                        rounded-2xl
                        border
                        border-zinc-200/80
                        bg-zinc-50/80
                        px-3
                        py-4
                        text-center
                        dark:border-zinc-800
                        dark:bg-zinc-950/70
                      "
                    >
                      <p
                        className="
                          text-base
                          font-bold
                          text-zinc-900
                          dark:text-white
                        "
                      >
                        {item.value}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-zinc-400
                          dark:text-zinc-600
                        "
                      >
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Closing statement */}

                <div
                  className="
                    mt-5
                    rounded-2xl
                    border
                    border-zinc-200/80
                    bg-zinc-50/80
                    p-4
                    dark:border-zinc-800
                    dark:bg-zinc-950/70
                  "
                >
                  <p
                    className="
                      text-sm
                      leading-6
                      text-zinc-600
                      dark:text-zinc-400
                    "
                  >
                    Turning ideas into useful software through thoughtful
                    engineering and applied AI.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}