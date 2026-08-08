"use client";

import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaArrowRight,
  FaCircle,
} from "react-icons/fa";

type TimelineItem = {
  year: string;
  title: string;
  organization: string;
  location: string;
  type: string;
  description: string;
  technologies: string[];
  icon: typeof FaBriefcase;
  current?: boolean;
};

const timeline: TimelineItem[] = [
  {
    year: "2025 — Present",
    title: "AI Engineer",
    organization: "L&T Technology Services (LTTS)",
    location: "Chennai, India",
    type: "Professional Experience",
    description:
      "Working on enterprise AI initiatives spanning retrieval-augmented generation, computer vision, and intelligent manufacturing solutions. Focused on translating AI capabilities into practical engineering systems with reliable backend services, data pipelines, and usable applications.",
    technologies: [
      "Python",
      "Generative AI",
      "RAG",
      "Computer Vision",
      "Deep Learning",
      "FastAPI",
    ],
    icon: FaBriefcase,
    current: true,
  },
  {
    year: "2021 — 2025",
    title: "Bachelor of Engineering in Computer Science",
    organization: "Chandigarh University",
    location: "Chandigarh, India",
    type: "Education",
    description:
      "Developed a strong foundation in computer science and software engineering through coursework and hands-on projects spanning algorithms, databases, Java, web development, artificial intelligence, and machine learning.",
    technologies: [
      "Java",
      "Python",
      "SQL",
      "Data Structures",
      "AI / ML",
    ],
    icon: FaGraduationCap,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="
        relative overflow-hidden
        border-t border-zinc-100
        bg-white py-24
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
          pointer-events-none absolute
          -right-48 top-1/4
          h-[520px] w-[520px]
          rounded-full
          bg-blue-500/[0.045]
          blur-[130px]
          dark:bg-blue-500/[0.06]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-48 bottom-0
          h-[480px] w-[480px]
          rounded-full
          bg-indigo-500/[0.035]
          blur-[130px]
          dark:bg-indigo-500/[0.045]
        "
      />

      {/* Subtle engineering grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.28]
          [background-image:linear-gradient(to_right,rgba(24,24,27,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.035)_1px,transparent_1px)]
          [background-size:64px_64px]
          dark:opacity-0
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="
                h-px w-9
                bg-blue-600
                dark:bg-blue-400
              "
            />

            <span
              className="
                text-xs font-bold uppercase
                tracking-[0.22em]
                text-blue-600
                dark:text-blue-400
              "
            >
              Experience & Education
            </span>
          </div>

          <h2
            id="experience-heading"
            className="
              mt-5
              max-w-4xl
              text-4xl font-black
              leading-[1.05]
              tracking-[-0.035em]
              text-zinc-950
              dark:text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Building experience through{" "}
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
              engineering.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-base leading-8
              text-zinc-600
              dark:text-zinc-400
              md:text-lg
            "
          >
            A snapshot of the professional experience and academic foundation
            behind my work across AI engineering and software development.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* CAREER SUMMARY */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="
            mt-12
            grid gap-px
            overflow-hidden
            rounded-2xl
            border border-zinc-200/80
            bg-zinc-200/80
            shadow-sm
            dark:border-zinc-800
            dark:bg-zinc-800
          "
        >
          <div
            className="
              grid
              bg-white/90
              sm:grid-cols-3
              dark:bg-zinc-900/90
            "
          >
            <div className="px-6 py-5 sm:border-r sm:border-zinc-200 dark:sm:border-zinc-800">
              <p
                className="
                  text-[10px] font-bold uppercase
                  tracking-[0.18em]
                  text-zinc-400
                "
              >
                Current Role
              </p>

              <p
                className="
                  mt-2 text-sm font-bold
                  text-zinc-900
                  dark:text-white
                "
              >
                AI Engineer
              </p>
            </div>

            <div className="border-t border-zinc-200 px-6 py-5 sm:border-t-0 sm:border-r dark:border-zinc-800">
              <p
                className="
                  text-[10px] font-bold uppercase
                  tracking-[0.18em]
                  text-zinc-400
                "
              >
                Domain
              </p>

              <p
                className="
                  mt-2 text-sm font-bold
                  text-zinc-900
                  dark:text-white
                "
              >
                AI · Software Engineering
              </p>
            </div>

            <div className="border-t border-zinc-200 px-6 py-5 sm:border-t-0 dark:border-zinc-800">
              <p
                className="
                  text-[10px] font-bold uppercase
                  tracking-[0.18em]
                  text-zinc-400
                "
              >
                Location
              </p>

              <p
                className="
                  mt-2 text-sm font-bold
                  text-zinc-900
                  dark:text-white
                "
              >
                Chennai, India
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* TIMELINE */}
        {/* ========================================================= */}

        <div className="relative mt-16 lg:mt-20">
          {/* Desktop timeline */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            aria-hidden="true"
            className="
              absolute
              left-[24px]
              top-0
              h-full
              w-px
              origin-top
              bg-gradient-to-b
              from-blue-500
              via-indigo-400
              to-transparent
              md:left-1/2
              md:-translate-x-1/2
            "
          />

          <div className="space-y-14 md:space-y-20">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.article
                  key={`${item.year}-${item.title}`}
                  initial={{
                    opacity: 0,
                    y: 35,
                    x: isLeft ? -15 : 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.18,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="relative md:grid md:grid-cols-2 md:gap-16"
                >
                  {/* ================================================= */}
                  {/* TIMELINE NODE */}
                  {/* ================================================= */}

                  <div
                    className="
                      absolute left-[24px] top-7
                      z-20 -translate-x-1/2
                      md:left-1/2
                    "
                  >
                    <div
                      className={`
                        relative flex h-11 w-11
                        items-center justify-center
                        rounded-full
                        border-[5px]
                        border-white
                        shadow-lg
                        dark:border-zinc-950
                        ${
                          item.current
                            ? "bg-blue-600 text-white shadow-blue-500/30"
                            : "bg-zinc-100 text-blue-600 shadow-zinc-900/10 dark:bg-zinc-900 dark:text-blue-400"
                        }
                      `}
                    >
                      <Icon
                        aria-hidden="true"
                        className="text-sm"
                      />

                      {item.current && (
                        <span
                          aria-hidden="true"
                          className="
                            absolute inset-0
                            rounded-full
                            animate-ping
                            bg-blue-500/20
                          "
                        />
                      )}
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* CARD */}
                  {/* ================================================= */}

                  <div
                    className={
                      isLeft
                        ? "pl-14 md:pr-8 md:pl-0"
                        : "pl-14 md:col-start-2 md:pl-8"
                    }
                  >
                    <ExperienceCard item={item} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM CTA */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="
            mt-16
            flex flex-col
            items-start
            justify-between
            gap-5
            rounded-2xl
            border border-zinc-200/80
            bg-zinc-50/70
            p-6
            dark:border-zinc-800
            dark:bg-zinc-900/50
            sm:flex-row
            sm:items-center
            sm:p-7
          "
        >
          <div>
            <p
              className="
                text-sm font-bold
                text-zinc-900
                dark:text-white
              "
            >
              Interested in what I&apos;m building?
            </p>

            <p
              className="
                mt-1.5 text-sm
                text-zinc-500
                dark:text-zinc-400
              "
            >
              Explore the projects and systems behind my work.
            </p>
          </div>

          <a
            href="#projects"
            className="
              group inline-flex shrink-0
              items-center gap-2
              rounded-xl
              border border-zinc-200
              bg-white
              px-5 py-3
              text-sm font-semibold
              text-zinc-800
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-blue-200
              hover:text-blue-600
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
              dark:border-zinc-700
              dark:bg-zinc-900
              dark:text-zinc-200
              dark:hover:border-blue-800
              dark:hover:text-blue-400
              dark:focus-visible:ring-offset-zinc-950
            "
          >
            View projects

            <FaArrowRight
              aria-hidden="true"
              className="
                text-xs
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCard({
  item,
}: {
  item: TimelineItem;
}) {
  return (
    <div
      className="
        group relative
        overflow-hidden
        rounded-[1.75rem]
        border border-zinc-200/80
        bg-white/90
        p-6
        shadow-[0_16px_50px_-30px_rgba(24,24,27,0.3)]
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-[0_25px_70px_-35px_rgba(37,99,235,0.22)]
        dark:border-zinc-800
        dark:bg-zinc-900/90
        dark:shadow-none
        dark:hover:border-zinc-700
        md:p-7
      "
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-500/70
          to-transparent
          opacity-60
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* ======================================================= */}
      {/* META */}
      {/* ======================================================= */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className="
            text-xs font-bold
            uppercase tracking-[0.14em]
            text-blue-600
            dark:text-blue-400
          "
        >
          {item.year}
        </span>

        {item.current && (
          <span
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-emerald-200
              bg-emerald-50
              px-3 py-1.5
              text-[11px] font-bold
              text-emerald-700
              dark:border-emerald-900/50
              dark:bg-emerald-950/30
              dark:text-emerald-400
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

            Current
          </span>
        )}
      </div>

      {/* ======================================================= */}
      {/* TITLE */}
      {/* ======================================================= */}

      <h3
        className="
          mt-5
          text-xl font-bold
          leading-tight
          tracking-tight
          text-zinc-950
          dark:text-white
          sm:text-2xl
        "
      >
        {item.title}
      </h3>

      {/* Organization */}
      <p
        className="
          mt-2
          text-sm font-semibold
          text-zinc-700
          dark:text-zinc-300
        "
      >
        {item.organization}
      </p>

      {/* ======================================================= */}
      {/* METADATA */}
      {/* ======================================================= */}

      <div
        className="
          mt-4
          flex flex-wrap
          items-center
          gap-x-4 gap-y-2
          text-xs font-medium
          text-zinc-500
          dark:text-zinc-500
        "
      >
        <span className="inline-flex items-center gap-2">
          <FaMapMarkerAlt
            aria-hidden="true"
            className="text-blue-500"
          />

          {item.location}
        </span>

        <span
          aria-hidden="true"
          className="hidden h-1 w-1 rounded-full bg-zinc-300 sm:block dark:bg-zinc-700"
        />

        <span>{item.type}</span>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-zinc-100 dark:bg-zinc-800" />

      {/* ======================================================= */}
      {/* DESCRIPTION */}
      {/* ======================================================= */}

      <p
        className="
          text-sm leading-7
          text-zinc-600
          dark:text-zinc-400
          md:text-[15px]
        "
      >
        {item.description}
      </p>

      {/* ======================================================= */}
      {/* TECHNOLOGIES */}
      {/* ======================================================= */}

      <div className="mt-6">
        <p
          className="
            mb-3
            text-[10px] font-bold
            uppercase tracking-[0.18em]
            text-zinc-400
          "
        >
          Core technologies
        </p>

        <div className="flex flex-wrap gap-2">
          {item.technologies.map((technology) => (
            <span
              key={technology}
              className="
                rounded-lg
                border border-zinc-200
                bg-zinc-50
                px-2.5 py-1.5
                text-[11px] font-semibold
                text-zinc-600
                transition-all duration-200
                group-hover:border-blue-100
                group-hover:text-blue-600
                dark:border-zinc-700
                dark:bg-zinc-950
                dark:text-zinc-400
                dark:group-hover:border-blue-900
                dark:group-hover:text-blue-400
              "
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}