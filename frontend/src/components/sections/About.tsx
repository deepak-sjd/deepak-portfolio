"use client";

import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBrain,
  FaCloud,
  FaJava,
  FaReact,
} from "react-icons/fa";

import Button from "@/components/ui/Button";

const focusAreas = [
  {
    icon: FaBrain,
    title: "AI Engineering",
    description: "RAG, LLM applications, computer vision and AI workflows",
    iconClass:
      "bg-blue-50 text-blue-600 group-hover:bg-blue-600 dark:bg-blue-950/50 dark:text-blue-400 dark:group-hover:bg-blue-500",
  },
  {
    icon: FaJava,
    title: "Backend Engineering",
    description: "Java, Spring Boot, REST APIs and scalable backend services",
    iconClass:
      "bg-orange-50 text-orange-600 group-hover:bg-orange-600 dark:bg-orange-950/40 dark:text-orange-400 dark:group-hover:bg-orange-500",
  },
  {
    icon: FaReact,
    title: "Web Development",
    description: "React, Next.js, TypeScript and modern user interfaces",
    iconClass:
      "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 dark:group-hover:bg-cyan-500",
  },
  {
    icon: FaCloud,
    title: "Cloud & Delivery",
    description: "Docker, CI/CD and reliable application delivery workflows",
    iconClass:
      "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 dark:group-hover:bg-indigo-500",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="
        relative overflow-hidden
        py-24 sm:py-28 lg:py-32
        bg-white
        dark:bg-zinc-950
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND ATMOSPHERE */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[-140px] top-1/3
          h-[460px] w-[460px]
          rounded-full
          bg-indigo-500/[0.06]
          blur-[120px]
          dark:bg-indigo-500/[0.06]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-[-180px] left-1/2
          h-[420px] w-[420px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/[0.05]
          blur-[120px]
          dark:bg-cyan-500/[0.05]
        "
      />

      {/* Subtle technical grid */}
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

      {/* ========================================================= */}
      {/* CONTENT */}
      {/* ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          {/* ===================================================== */}
          {/* PROFILE CARD */}
          {/* ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md">
              {/* Card glow */}
              <div
                aria-hidden="true"
                className="
                  absolute -inset-5
                  rounded-[2rem]
                  bg-gradient-to-br
                  from-blue-500/[0.10]
                  via-indigo-500/[0.06]
                  to-cyan-500/[0.09]
                  blur-2xl
                  dark:from-blue-500/[0.08]
                  dark:via-indigo-500/[0.04]
                  dark:to-cyan-500/[0.06]
                "
              />

              <div
                className="
                  relative overflow-hidden
                  rounded-[2rem]
                  border border-zinc-200/80
                  bg-white/85
                  shadow-[0_20px_60px_-30px_rgba(24,24,27,0.28)]
                  backdrop-blur-xl
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:shadow-black/20
                "
              >
                {/* Accent line */}
                <div
                  aria-hidden="true"
                  className="
                    h-1
                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-500
                    to-cyan-500
                  "
                />

                <div className="p-7 sm:p-9">
                  {/* Identity */}
                  <div className="flex items-center gap-5">
                    <div
                      className="
                        relative flex h-[72px] w-[72px] shrink-0
                        items-center justify-center
                        overflow-hidden rounded-2xl
                        bg-gradient-to-br
                        from-blue-600
                        via-indigo-600
                        to-cyan-500
                        shadow-lg shadow-blue-600/20
                      "
                    >
                      <span
                        className="
                          text-xl font-black
                          tracking-tight text-white
                        "
                      >
                        DK
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          absolute -right-4 -top-4
                          h-12 w-12
                          rounded-full
                          bg-white/15
                          blur-lg
                        "
                      />
                    </div>

                    <div>
                      <p
                        className="
                          text-xl font-bold
                          tracking-tight
                          text-zinc-950
                          dark:text-white
                        "
                      >
                        Deepak Kumar
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm font-medium
                          text-blue-600
                          dark:text-blue-400
                        "
                      >
                        AI Engineer · Full Stack Developer
                      </p>
                    </div>
                  </div>

                  <div className="my-8 h-px bg-zinc-200/80 dark:bg-zinc-800" />

                  {/* Engineering philosophy */}
                  <p
                    className="
                      text-[15px]
                      leading-7
                      text-zinc-600
                      dark:text-zinc-400
                    "
                  >
                    I work at the intersection of{" "}
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                      AI engineering
                    </span>{" "}
                    and{" "}
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                      software engineering
                    </span>
                    , turning technical ideas into reliable and usable
                    applications.
                  </p>

                  {/* Engineering principles */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div
                      className="
                        rounded-xl
                        border border-blue-100/80
                        bg-blue-50/60
                        p-4
                        dark:border-blue-900/40
                        dark:bg-blue-950/30
                      "
                    >
                      <p
                        className="
                          text-[10px] font-bold
                          uppercase tracking-[0.16em]
                          text-blue-600/70
                          dark:text-blue-400/70
                        "
                      >
                        Primary Focus
                      </p>

                      <p
                        className="
                          mt-1.5
                          text-sm font-semibold
                          text-zinc-900
                          dark:text-zinc-200
                        "
                      >
                        AI Systems
                      </p>
                    </div>

                    <div
                      className="
                        rounded-xl
                        border border-indigo-100/80
                        bg-indigo-50/60
                        p-4
                        dark:border-indigo-900/40
                        dark:bg-indigo-950/30
                      "
                    >
                      <p
                        className="
                          text-[10px] font-bold
                          uppercase tracking-[0.16em]
                          text-indigo-600/70
                          dark:text-indigo-400/70
                        "
                      >
                        Engineering
                      </p>

                      <p
                        className="
                          mt-1.5
                          text-sm font-semibold
                          text-zinc-900
                          dark:text-zinc-200
                        "
                      >
                        Backend & APIs
                      </p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mt-7 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="
                        h-2.5 w-2.5
                        rounded-full
                        bg-emerald-500
                        shadow-[0_0_0_4px_rgba(16,185,129,0.10)]
                      "
                    />

                    <span
                      className="
                        text-xs font-medium
                        text-zinc-500
                        dark:text-zinc-400
                      "
                    >
                      Building practical AI & software systems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===================================================== */}
          {/* ABOUT CONTENT */}
          {/* ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="
                  h-px w-8
                  bg-blue-600
                  dark:bg-blue-400
                "
              />

              <span
                className="
                  text-xs font-bold
                  uppercase tracking-[0.22em]
                  text-blue-600
                  dark:text-blue-400
                "
              >
                About
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                mt-5 max-w-3xl
                text-4xl font-black
                leading-[1.08]
                tracking-tight
                text-zinc-950
                dark:text-white
                md:text-5xl
                lg:text-[3.5rem]
              "
            >
              Building intelligent systems with{" "}
              <span
                className="
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
                strong engineering foundations.
              </span>
            </h2>

            {/* Description */}
            <div
              className="
                mt-7 max-w-2xl
                space-y-5
                text-[15px]
                leading-8
                text-zinc-600
                dark:text-zinc-400
                md:text-base
              "
            >
              <p>
                I&apos;m an AI Engineer and Java Full Stack Developer focused
                on building practical software systems that combine
                intelligent capabilities with solid engineering principles.
              </p>

              <p>
                My work spans generative AI, retrieval-based applications,
                computer vision, backend services, and modern web
                development. I care about writing systems that are
                maintainable, testable, scalable, and useful beyond a
                prototype.
              </p>

              <p>
                I enjoy working across the stack — from designing APIs and
                application architecture to integrating AI models and
                building interfaces that make complex systems easier to use.
              </p>
            </div>

            {/* Focus Areas */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area, index) => {
                const Icon = area.icon;

                return (
                  <motion.div
                    key={area.title}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.07,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="
                      group
                      rounded-2xl
                      border border-zinc-200/80
                      bg-white/75
                      p-5
                      shadow-[0_8px_30px_-20px_rgba(24,24,27,0.3)]
                      backdrop-blur-sm
                      transition-shadow duration-300
                      hover:shadow-[0_16px_35px_-20px_rgba(24,24,27,0.35)]
                      dark:border-zinc-800
                      dark:bg-zinc-900
                      dark:shadow-none
                    "
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`
                          flex h-11 w-11 shrink-0
                          items-center justify-center
                          rounded-xl
                          transition-colors duration-300
                          ${area.iconClass}
                        `}
                      >
                        <Icon
                          aria-hidden="true"
                          className="
                            text-lg
                            transition-colors duration-300
                            group-hover:text-white
                          "
                        />
                      </div>

                      <div>
                        <h3
                          className="
                            font-bold
                            text-zinc-950
                            dark:text-white
                          "
                        >
                          {area.title}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-sm leading-6
                            text-zinc-500
                            dark:text-zinc-400
                          "
                        >
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="/resume.pdf"
               className="..."
               >
                Download Resume
                <FaArrowRight
                  aria-hidden="true"
                  className="ml-2 text-xs"
                />
              </Button>

              <a
                href="#contact"
                className="
                  group
                  inline-flex items-center gap-2
                  text-sm font-semibold
                  text-zinc-700
                  transition-colors duration-200
                  hover:text-blue-600
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-4
                  dark:text-zinc-300
                  dark:hover:text-blue-400
                  dark:focus-visible:ring-offset-zinc-950
                "
              >
                Let's work together

                <FaArrowRight
                  aria-hidden="true"
                  className="
                    text-xs
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
