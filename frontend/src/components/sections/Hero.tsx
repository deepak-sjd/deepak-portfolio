"use client";

import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaJava,
  FaReact,
  FaDocker,
  FaPython,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiPytorch,
  SiFastapi,
} from "react-icons/si";

import Button from "@/components/ui/Button";

const technologies = [
  { icon: FaPython, name: "Python" },
  { icon: FaJava, name: "Java" },
  { icon: SiSpringboot, name: "Spring Boot" },
  { icon: FaReact, name: "React" },
  { icon: FaDocker, name: "Docker" },
  { icon: SiFastapi, name: "FastAPI" },
  { icon: SiPytorch, name: "PyTorch" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiMysql, name: "MySQL" },
  { icon: FaGitAlt, name: "Git" },
];

const focusAreas = [
  "Generative AI",
  "RAG Systems",
  "Computer Vision",
  "Full Stack Development",
];

const engineeringFocus = [
  { value: "AI", label: "Engineering" },
  { value: "Java", label: "Backend" },
  { value: "Full", label: "Stack" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative min-h-screen
        overflow-hidden
        border-b border-zinc-100
        bg-white
        dark:border-zinc-900
        dark:bg-zinc-950
      "
    >
      {/* ========================================================= */}
      {/* BACKGROUND ATMOSPHERE */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0 opacity-[0.025]
          [background-image:linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)]
          [background-size:64px_64px]
          dark:opacity-[0.035]
          dark:[background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        "
      />

      {/* Ambient gradient */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-[-20%]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.06]
          blur-3xl
          dark:bg-blue-500/[0.08]
        "
      />

      {/* ========================================================= */}
      {/* MAIN CONTAINER */}
      {/* ========================================================= */}

      <div
        className="
          relative
          mx-auto flex min-h-screen
          max-w-7xl items-center
          px-6 py-20
          lg:px-8 lg:py-24
        "
      >
        <div
          className="
            grid w-full
            items-center
            gap-16
            lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-20
          "
        >
          {/* ===================================================== */}
          {/* LEFT CONTENT */}
          {/* ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              ease: "easeOut",
            }}
            className="max-w-3xl"
          >
            {/* Status badge */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-zinc-200
                bg-zinc-50/80
                px-4 py-2
                text-xs font-semibold
                tracking-wide
                text-zinc-600
                backdrop-blur
                dark:border-zinc-800
                dark:bg-zinc-900/70
                dark:text-zinc-400
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  aria-hidden="true"
                  className="
                    absolute inline-flex
                    h-full w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-60
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    relative inline-flex
                    h-2 w-2
                    rounded-full
                    bg-emerald-500
                  "
                />
              </span>

              AI Engineer · Software Developer
            </motion.div>

            {/* Main heading */}

            <h1
              className="
                mt-7
                max-w-4xl
                text-4xl font-black
                leading-[1.05]
                tracking-[-0.035em]
                text-zinc-950
                dark:text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Building software
              <span className="block">
                with{" "}
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
                  intelligence.
                </span>
              </span>
            </h1>

            {/* Professional role */}

            <p
              className="
                mt-7
                text-lg font-semibold
                text-zinc-700
                dark:text-zinc-300
                md:text-xl
              "
            >
              AI Engineer · Java Full Stack Developer
            </p>

            {/* Short introduction */}

            <p
              className="
                mt-5 max-w-2xl
                text-base leading-8
                text-zinc-600
                dark:text-zinc-400
                md:text-lg
              "
            >
              I build AI-powered applications and modern software systems,
              combining machine learning with reliable backend and frontend
              engineering to solve practical problems.
            </p>

            {/* Focus areas */}

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
              {focusAreas.map((area, index) => (
                <motion.span
                  key={area}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.35 + index * 0.08,
                  }}
                  className="
                    inline-flex items-center gap-2
                    text-sm font-medium
                    text-zinc-500
                    dark:text-zinc-400
                  "
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-blue-500"
                  />

                  {area}
                </motion.span>
              ))}
            </div>

            {/* Primary actions */}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#contact">
                <Button
                  className="
                    px-7 py-3.5 text-base
                    shadow-lg shadow-blue-500/20
                    transition-transform
                    hover:scale-[1.02]
                  "
                >
                  Let&apos;s Connect
                </Button>
              </a>

              <a href="#projects">
                <Button
                  variant="secondary"
                  className="
                    px-7 py-3.5 text-base
                    transition-transform
                    hover:scale-[1.02]
                  "
                >
                  View Projects
                </Button>
              </a>
            </div>

            {/* Social links */}

            <div className="mt-9 flex items-center gap-3">
              <span
                className="
                  mr-2
                  text-xs font-medium
                  uppercase tracking-wider
                  text-zinc-400
                  dark:text-zinc-600
                "
              >
                Find me
              </span>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-zinc-200
                  bg-white
                  text-lg text-zinc-500
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-zinc-400
                  hover:text-zinc-950
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:text-zinc-400
                  dark:hover:border-zinc-600
                  dark:hover:text-white
                "
              >
                <FaGithub />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-zinc-200
                  bg-white
                  text-lg text-zinc-500
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-blue-300
                  hover:text-blue-600
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:text-zinc-400
                  dark:hover:border-blue-800
                  dark:hover:text-blue-400
                "
              >
                <FaLinkedin />
              </a>
            </div>

            {/* Core technology stack */}

            <div className="mt-12">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="
                    text-xs font-bold
                    uppercase tracking-[0.18em]
                    text-zinc-400
                    dark:text-zinc-600
                  "
                >
                  Core Stack
                </span>

                <span
                  aria-hidden="true"
                  className="h-px w-12 bg-zinc-200 dark:bg-zinc-800"
                />
              </div>

              <div className="flex max-w-2xl flex-wrap gap-2.5">
                {technologies.map((tech) => {
                  const Icon = tech.icon;

                  return (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -3 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="
                        group flex items-center gap-2
                        rounded-xl
                        border border-zinc-200/80
                        bg-white/80
                        px-3.5 py-2.5
                        shadow-sm
                        backdrop-blur
                        dark:border-zinc-800
                        dark:bg-zinc-900/70
                      "
                    >
                      <Icon
                        aria-hidden="true"
                        className="
                          text-base
                          text-zinc-500
                          transition-colors
                          group-hover:text-blue-600
                          dark:text-zinc-500
                          dark:group-hover:text-blue-400
                        "
                      />

                      <span
                        className="
                          text-xs font-semibold
                          text-zinc-600
                          dark:text-zinc-400
                        "
                      >
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ===================================================== */}
          {/* RIGHT ENGINEERING SNAPSHOT */}
          {/* ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[410px]">
              {/* Ambient glow */}

              <div
                aria-hidden="true"
                className="
                  absolute -inset-8
                  rounded-[40px]
                  bg-blue-500/10
                  blur-3xl
                  dark:bg-blue-500/10
                "
              />

              {/* Main card */}

              <div
                className="
                  relative overflow-hidden
                  rounded-[32px]
                  border border-zinc-200/80
                  bg-white/90
                  p-7
                  shadow-2xl shadow-zinc-900/5
                  backdrop-blur-xl
                  dark:border-zinc-800
                  dark:bg-zinc-900/90
                  dark:shadow-black/20
                  md:p-8
                "
              >
                {/* Decorative top line */}

                <div
                  aria-hidden="true"
                  className="
                    absolute inset-x-0 top-0 h-px
                    bg-gradient-to-r
                    from-transparent
                    via-blue-500
                    to-transparent
                  "
                />

                {/* Card header */}

                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className="
                        text-xs font-bold
                        uppercase tracking-[0.18em]
                        text-zinc-400
                        dark:text-zinc-600
                      "
                    >
                      Engineering
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm font-medium
                        text-zinc-500
                        dark:text-zinc-400
                      "
                    >
                      AI · Software · Systems
                    </p>
                  </div>

                  <div
                    className="
                      flex items-center gap-2
                      rounded-full
                      border border-emerald-200
                      bg-emerald-50
                      px-3 py-1.5
                      dark:border-emerald-900/50
                      dark:bg-emerald-950/30
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        h-1.5 w-1.5
                        animate-pulse
                        rounded-full
                        bg-emerald-500
                      "
                    />

                    <span
                      className="
                        text-[11px] font-semibold
                        text-emerald-700
                        dark:text-emerald-400
                      "
                    >
                      Open to connect
                    </span>
                  </div>
                </div>

                {/* Identity */}

                <div className="mt-9 flex flex-col items-center text-center">
                  <div className="relative">
                    {/* Avatar glow */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute -inset-2
                        rounded-full
                        bg-gradient-to-br
                        from-blue-500/30
                        to-indigo-500/30
                        blur-xl
                      "
                    />

                    {/* Avatar */}

                    <div
                      className="
                        relative flex h-28 w-28
                        items-center justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-blue-600
                        via-indigo-600
                        to-violet-600
                        text-3xl font-black
                        tracking-tight text-white
                        shadow-xl shadow-blue-500/20
                      "
                    >
                      DK
                    </div>
                  </div>

                  <h2
                    className="
                      mt-6
                      text-2xl font-bold
                      tracking-tight
                      text-zinc-900
                      dark:text-white
                    "
                  >
                    Deepak Kumar
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm font-semibold
                      text-blue-600
                      dark:text-blue-400
                    "
                  >
                    AI Engineer
                  </p>

                  <p
                    className="
                      mt-4 max-w-xs
                      text-sm leading-6
                      text-zinc-500
                      dark:text-zinc-400
                    "
                  >
                    Building practical AI systems and dependable software
                    with modern engineering practices.
                  </p>
                </div>

                {/* Divider */}

                <div
                  aria-hidden="true"
                  className="my-8 h-px bg-zinc-200 dark:bg-zinc-800"
                />

                {/* Engineering focus */}

                <div className="grid grid-cols-3 gap-2.5">
                  {engineeringFocus.map((item) => (
                    <div
                      key={item.value}
                      className="
                        rounded-2xl
                        border border-zinc-200/70
                        bg-zinc-50
                        px-3 py-4
                        text-center
                        dark:border-zinc-800
                        dark:bg-zinc-950
                      "
                    >
                      <p
                        className="
                          text-lg font-bold
                          text-zinc-900
                          dark:text-white
                        "
                      >
                        {item.value}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px] font-medium
                          uppercase tracking-wide
                          text-zinc-500
                        "
                      >
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Location / availability */}

                <div
                  className="
                    mt-5 flex items-center
                    justify-between
                    rounded-2xl
                    border border-zinc-200/70
                    bg-zinc-50
                    px-4 py-3
                    dark:border-zinc-800
                    dark:bg-zinc-950
                  "
                >
                  <span
                    className="
                      text-xs font-medium
                      text-zinc-500
                      dark:text-zinc-500
                    "
                  >
                    Chennai, India
                  </span>

                  <span
                    className="
                      text-xs font-semibold
                      text-blue-600
                      dark:text-blue-400
                    "
                  >
                    Building & shipping
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
