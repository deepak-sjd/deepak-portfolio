"use client";

import { motion } from "framer-motion";
import {
  FaDocker,
  FaGitAlt,
  FaJava,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiFastapi,
  SiLangchain,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiPytorch,
  SiSpringboot,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

type SkillCategory =
  | "AI & Machine Learning"
  | "Backend Engineering"
  | "Frontend Engineering"
  | "Data & Infrastructure";

type Skill = {
  name: string;
  icon: React.ReactNode;
  category: SkillCategory;
  description: string;
  featured?: boolean;
};

const skills: Skill[] = [
  {
    name: "Python",
    icon: <FaPython aria-hidden="true" />,
    category: "AI & Machine Learning",
    description: "AI pipelines, data processing and model development",
    featured: true,
  },
  {
    name: "PyTorch",
    icon: <SiPytorch aria-hidden="true" />,
    category: "AI & Machine Learning",
    description: "Deep learning and computer vision",
    featured: true,
  },
  {
    name: "TensorFlow",
    icon: <SiTensorflow aria-hidden="true" />,
    category: "AI & Machine Learning",
    description: "Machine learning and neural networks",
  },
  {
    name: "LangChain",
    icon: <SiLangchain aria-hidden="true" />,
    category: "AI & Machine Learning",
    description: "LLM applications and retrieval pipelines",
    featured: true,
  },
  {
    name: "Java",
    icon: <FaJava aria-hidden="true" />,
    category: "Backend Engineering",
    description: "Object-oriented and enterprise application development",
    featured: true,
  },
  {
    name: "Spring Boot",
    icon: <SiSpringboot aria-hidden="true" />,
    category: "Backend Engineering",
    description: "REST APIs, services and backend systems",
    featured: true,
  },
  {
    name: "FastAPI",
    icon: <SiFastapi aria-hidden="true" />,
    category: "Backend Engineering",
    description: "High-performance Python APIs and AI services",
  },
  {
    name: "React",
    icon: <FaReact aria-hidden="true" />,
    category: "Frontend Engineering",
    description: "Component-based application interfaces",
    featured: true,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs aria-hidden="true" />,
    category: "Frontend Engineering",
    description: "Production-ready React applications",
    featured: true,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript aria-hidden="true" />,
    category: "Frontend Engineering",
    description: "Type-safe modern web development",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql aria-hidden="true" />,
    category: "Data & Infrastructure",
    description: "Relational data modeling and persistence",
    featured: true,
  },
  {
    name: "MySQL",
    icon: <SiMysql aria-hidden="true" />,
    category: "Data & Infrastructure",
    description: "Relational databases and SQL",
  },
  {
    name: "Docker",
    icon: <FaDocker aria-hidden="true" />,
    category: "Data & Infrastructure",
    description: "Containerization and reproducible environments",
    featured: true,
  },
  {
    name: "Git",
    icon: <FaGitAlt aria-hidden="true" />,
    category: "Data & Infrastructure",
    description: "Version control and collaborative development",
  },
];

const categories: {
  name: SkillCategory;
  eyebrow: string;
  description: string;
}[] = [
  {
    name: "AI & Machine Learning",
    eyebrow: "01 / INTELLIGENCE",
    description:
      "Building intelligent applications, ML pipelines and LLM-powered systems.",
  },
  {
    name: "Backend Engineering",
    eyebrow: "02 / SERVICES",
    description:
      "Designing APIs, services and maintainable backend architectures.",
  },
  {
    name: "Frontend Engineering",
    eyebrow: "03 / INTERFACES",
    description:
      "Creating responsive, accessible and production-quality web experiences.",
  },
  {
    name: "Data & Infrastructure",
    eyebrow: "04 / PLATFORM",
    description:
      "Working with data persistence, containers and development infrastructure.",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-500/[0.05] blur-[120px] dark:bg-blue-500/[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-500/[0.05] blur-[120px] dark:bg-indigo-500/[0.05]"
      />

      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:linear-gradient(to_right,rgba(24,24,27,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.035)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-0"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-blue-600 dark:bg-blue-400"
            />

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Engineering Stack
            </span>
          </div>

          <h2
            id="skills-heading"
            className="mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-[3.5rem]"
          >
            Technologies I use to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
              build systems.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 md:text-lg">
            A practical engineering stack spanning AI applications, backend
            services, modern web development, data systems and infrastructure.
          </p>
        </motion.div>

        {/* Capability summary */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {[
            "AI Engineering",
            "Backend Systems",
            "Full-Stack Development",
            "Production Infrastructure",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Categories */}
        <div className="mt-16 space-y-14">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category.name,
            );

            return (
              <motion.section
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.55,
                  delay: categoryIndex * 0.06,
                  ease: "easeOut",
                }}
                aria-labelledby={`skill-category-${categoryIndex}`}
              >
                {/* Category heading */}
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                      {category.eyebrow}
                    </p>

                    <h3
                      id={`skill-category-${categoryIndex}`}
                      className="mt-2 text-xl font-bold tracking-tight text-zinc-950 dark:text-white"
                    >
                      {category.name}
                    </h3>

                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                      {category.description}
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-zinc-200 dark:bg-zinc-800 lg:block"
                  />

                  <span className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-600">
                    {String(categorySkills.length).padStart(2, "0")}{" "}
                    technologies
                  </span>
                </div>

                {/* Technology grid */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                      whileHover={{ y: -3 }}
                      className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-[0_8px_30px_-24px_rgba(24,24,27,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.25)] dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-blue-900/70"
                    >
                      {/* Top accent */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 transition-transform duration-300 group-hover:scale-x-100"
                      />

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-xl text-zinc-700 transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:group-hover:border-blue-900 dark:group-hover:bg-blue-950/40 dark:group-hover:text-blue-400">
                          {skill.icon}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="truncate text-sm font-bold text-zinc-950 dark:text-white">
                              {skill.name}
                            </h4>

                            {skill.featured && (
                              <span
                                aria-label="Core technology"
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                              />
                            )}
                          </div>

                          <p className="mt-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-500">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
              I choose technologies based on the requirements of the system,
              with an emphasis on maintainability, reliability and long-term
              engineering value.
            </p>

            <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
              Build · Integrate · Ship
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}