"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiFastapi,
  SiFlutter,
  SiLangchain,
  SiMysql,
  SiNextdotjs,
  SiOpencv,
  SiPostgresql,
  SiPytorch,
  SiScikitlearn,
  SiSpringboot,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import {
  BotMessageSquare,
  BrainCircuit,
  Database,
  DatabaseZap,
  LayoutPanelTop,
  ScanEye,
  Server,
  Smartphone,
  Sparkles,
  Boxes,
} from "lucide-react";

import { getSkills, type SkillApiResponse } from "@/lib/api/skills";

/* ==========================================================================
   Types
   ========================================================================== */

type SkillCategory =
  | "AI/ML"
  | "Generative AI"
  | "Backend"
  | "Frontend"
  | "Database"
  | "DevOps"
  | "Mobile";

type Skill = {
  id: number;
  name: string;
  icon: React.ReactNode;
  category: SkillCategory;
  description: string;
  featured?: boolean;
  displayOrder: number;
};

/*
|--------------------------------------------------------------------------
| UI metadata
|--------------------------------------------------------------------------
| The backend only stores id, name, category, displayOrder. Everything
| below is presentation metadata layered on top of real skill records —
| nothing here is invented data, it just describes skills that exist.
|--------------------------------------------------------------------------
*/

const skillMetadata: Record<
  string,
  { description: string; featured?: boolean; icon: React.ReactNode }
> = {
  Python: {
    icon: <FaPython aria-hidden="true" />,
    description: "AI pipelines, data processing and model development",
    featured: true,
  },
  "Machine Learning": {
    icon: <SiScikitlearn aria-hidden="true" />,
    description: "Predictive modeling, feature engineering and classical algorithms",
    featured: true,
  },
  "Deep Learning": {
    icon: <BrainCircuit aria-hidden="true" />,
    description: "Neural network design, training and optimization at scale",
    featured: true,
  },
  "Computer Vision": {
    icon: <SiOpencv aria-hidden="true" />,
    description: "Image classification, detection and segmentation pipelines",
    featured: true,
  },
  PyTorch: {
    icon: <SiPytorch aria-hidden="true" />,
    description: "Deep learning and computer vision",
  },
  TensorFlow: {
    icon: <SiTensorflow aria-hidden="true" />,
    description: "Machine learning and neural networks",
  },
  LangChain: {
    icon: <SiLangchain aria-hidden="true" />,
    description: "LLM applications and retrieval pipelines",
    featured: true,
  },
  LLMs: {
    icon: <BotMessageSquare aria-hidden="true" />,
    description: "Prompting, fine-tuning and integrating large language models",
    featured: true,
  },
  RAG: {
    icon: <DatabaseZap aria-hidden="true" />,
    description: "Grounding model responses in retrieved, domain-specific knowledge",
    featured: true,
  },
  VLMs: {
    icon: <ScanEye aria-hidden="true" />,
    description: "Multimodal models that reason jointly over images and text",
  },
  Java: {
    icon: <FaJava aria-hidden="true" />,
    description: "Object-oriented and enterprise application development",
    featured: true,
  },
  "Spring Boot": {
    icon: <SiSpringboot aria-hidden="true" />,
    description: "REST APIs, services and backend systems",
    featured: true,
  },
  FastAPI: {
    icon: <SiFastapi aria-hidden="true" />,
    description: "High-performance Python APIs and AI services",
  },
  React: {
    icon: <FaReact aria-hidden="true" />,
    description: "Component-based application interfaces",
    featured: true,
  },
  "Next.js": {
    icon: <SiNextdotjs aria-hidden="true" />,
    description: "Production-ready React applications",
    featured: true,
  },
  TypeScript: {
    icon: <SiTypescript aria-hidden="true" />,
    description: "Type-safe modern web development",
  },
  SQL: {
    icon: <FaDatabase aria-hidden="true" />,
    description: "Schema design, queries and relational data modeling",
    featured: true,
  },
  PostgreSQL: {
    icon: <SiPostgresql aria-hidden="true" />,
    description: "Relational data modeling and persistence",
    featured: true,
  },
  MySQL: {
    icon: <SiMysql aria-hidden="true" />,
    description: "Relational databases and SQL",
  },
  Docker: {
    icon: <FaDocker aria-hidden="true" />,
    description: "Containerization and reproducible environments",
    featured: true,
  },
  Git: {
    icon: <FaGitAlt aria-hidden="true" />,
    description: "Version control and collaborative development",
  },
  Flutter: {
    icon: <SiFlutter aria-hidden="true" />,
    description: "Cross-platform mobile apps from a single codebase",
    featured: true,
  },
};

/* ==========================================================================
   API → UI mapping
   ========================================================================== */

function mapApiSkill(skill: SkillApiResponse): Skill {
  const metadata = skillMetadata[skill.name];

  return {
    id: skill.id,
    name: skill.name,
    category: skill.category as SkillCategory,
    displayOrder: skill.displayOrder,
    icon:
      metadata?.icon ?? (
        <span aria-hidden="true" className="text-sm font-bold">
          {skill.name.charAt(0)}
        </span>
      ),
    description:
      metadata?.description ??
      "Technology used in software engineering and application development.",
    featured: metadata?.featured ?? false,
  };
}

/* ==========================================================================
   Category config — order matters, drives tab order
   ========================================================================== */

const categories: {
  name: SkillCategory;
  short: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "AI/ML",
    short: "AI / ML",
    description: "Machine learning, deep learning and computer vision systems.",
    icon: <BrainCircuit aria-hidden="true" />,
  },
  {
    name: "Generative AI",
    short: "Generative AI",
    description: "LLMs, RAG and modern generative AI applications.",
    icon: <Sparkles aria-hidden="true" />,
  },
  {
    name: "Backend",
    short: "Backend",
    description: "Designing APIs, services and maintainable backend architectures.",
    icon: <Server aria-hidden="true" />,
  },
  {
    name: "Frontend",
    short: "Frontend",
    description: "Responsive, accessible and production-quality web experiences.",
    icon: <LayoutPanelTop aria-hidden="true" />,
  },
  {
    name: "Database",
    short: "Database",
    description: "Relational databases and reliable data persistence.",
    icon: <Database aria-hidden="true" />,
  },
  {
    name: "DevOps",
    short: "DevOps",
    description: "Containerization, version control and development infrastructure.",
    icon: <Boxes aria-hidden="true" />,
  },
  {
    name: "Mobile",
    short: "Mobile",
    description: "Cross-platform mobile apps with Flutter and Firebase.",
    icon: <Smartphone aria-hidden="true" />,
  },
];

/* ==========================================================================
   Animation variants
   ========================================================================== */

const panelVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

const gridVariants = {
  animate: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 12, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

/* ==========================================================================
   Component
   ========================================================================== */

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("AI/ML");

  useEffect(() => {
    async function loadSkills() {
      try {
        setLoading(true);
        setError(null);
        const data = await getSkills();
        setSkills(data.map(mapApiSkill));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load skills.");
      } finally {
        setLoading(false);
      }
    }

    loadSkills();
  }, []);

  // Only show tabs for categories that actually have skills once data arrives
  const categoriesWithCounts = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          count: skills.filter((s) => s.category === category.name).length,
        }))
        .filter((category) => category.count > 0),
    [skills]
  );

  useEffect(() => {
    if (
      categoriesWithCounts.length > 0 &&
      !categoriesWithCounts.some((c) => c.name === activeCategory)
    ) {
      setActiveCategory(categoriesWithCounts[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesWithCounts]);

  const activeCategoryMeta = categoriesWithCounts.find(
    (c) => c.name === activeCategory
  );

  const activeSkills = useMemo(
    () =>
      skills
        .filter((skill) => skill.category === activeCategory)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [skills, activeCategory]
  );

  const coreSkills = activeSkills.filter((s) => s.featured);
  const otherSkills = activeSkills.filter((s) => !s.featured);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-500/[0.06] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-500/[0.05] blur-[120px]"
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
            <span aria-hidden="true" className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Engineering Stack
            </span>
          </div>

          <h2
            id="skills-heading"
            className="mt-4 max-w-4xl text-3xl font-black leading-[1.1] tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Technologies I use to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
              build systems.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 md:text-base">
            A practical engineering stack spanning AI applications, backend
            services, modern web development, data systems and infrastructure.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="mt-14 rounded-2xl border border-zinc-200 bg-white p-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            Loading skills...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-14 rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Interactive stack */}
        {!loading && !error && categoriesWithCounts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8"
          >
            {/* Tab bar */}
            <div
              role="tablist"
              aria-label="Skill categories"
              className="flex flex-wrap gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800"
            >
              {categoriesWithCounts.map((category) => {
                const isActive = category.name === activeCategory;
                return (
                  <button
                    key={category.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category.name)}
                    className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skills-active-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-zinc-950 dark:bg-white"
                      />
                    )}
                    <span
                      className={`relative z-10 text-base ${
                        isActive
                          ? "text-white dark:text-zinc-950"
                          : "text-zinc-500 dark:text-zinc-500"
                      }`}
                    >
                      {category.icon}
                    </span>
                    <span
                      className={`relative z-10 ${
                        isActive
                          ? "text-white dark:text-zinc-950"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {category.short}
                    </span>
                    <span
                      className={`relative z-10 font-mono text-[10px] ${
                        isActive
                          ? "text-white/70 dark:text-zinc-950/60"
                          : "text-zinc-400 dark:text-zinc-600"
                      }`}
                    >
                      {String(category.count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active category panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="pt-6"
              >
                <p className="max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {activeCategoryMeta?.description}
                </p>

                {/* Core skills — compact horizontal cards, scroll in one row */}
                {coreSkills.length > 0 && (
                  <motion.div
                    variants={gridVariants}
                    initial="initial"
                    animate="animate"
                    className="scrollbar-thin mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3"
                  >
                    {coreSkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        variants={itemVariants}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        whileHover={{ y: -3 }}
                        title={skill.description}
                        className="group relative flex w-[240px] shrink-0 snap-start items-center gap-3 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50/60 p-4 shadow-[0_8px_30px_-24px_rgba(24,24,27,0.35)] transition-colors duration-300 hover:border-blue-300 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/60 dark:hover:border-blue-900 sm:w-[280px]"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 transition-transform duration-300 group-hover:scale-x-100"
                        />
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-lg text-white transition-transform duration-300 group-hover:scale-105 dark:bg-white dark:text-zinc-950">
                          {skill.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-bold text-zinc-950 dark:text-white">
                            {skill.name}
                          </h4>
                          <p className="mt-1 truncate text-xs leading-5 text-zinc-500 dark:text-zinc-500">
                            {skill.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Supporting skills — compact chips, no repeated card chrome */}
                {otherSkills.length > 0 && (
                  <motion.div
                    variants={gridVariants}
                    initial="initial"
                    animate="animate"
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {otherSkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        variants={itemVariants}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        title={skill.description}
                        className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white"
                      >
                        <span className="text-sm text-zinc-400 transition-colors group-hover:text-blue-500 dark:text-zinc-600">
                          {skill.icon}
                        </span>
                        {skill.name}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800"
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

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.5) transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(148, 163, 184, 0.5);
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
