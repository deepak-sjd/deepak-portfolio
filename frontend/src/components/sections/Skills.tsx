"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaAws,
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
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiPytorch,
  SiRedis,
  SiScikitlearn,
  SiSpringboot,
  SiTailwindcss,
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

const skillMetadataList: Record<
  string,
  { description: string; featured?: boolean; icon: React.ReactNode }
> = {
  python: {
    icon: <FaPython aria-hidden="true" />,
    description: "AI pipelines, data processing and model development.",
    featured: true,
  },
  "machine learning": {
    icon: <SiScikitlearn aria-hidden="true" />,
    description: "Predictive modeling, feature engineering and classical algorithms.",
    featured: true,
  },
  "deep learning": {
    icon: <BrainCircuit aria-hidden="true" />,
    description: "Neural network design, training and optimization at scale.",
    featured: true,
  },
  "computer vision": {
    icon: <ScanEye aria-hidden="true" />,
    description: "Image classification, detection and segmentation pipelines.",
    featured: true,
  },
  pytorch: {
    icon: <SiPytorch aria-hidden="true" />,
    description: "Training and fine-tuning neural networks for deep learning.",
    featured: true,
  },
  tensorflow: {
    icon: <SiTensorflow aria-hidden="true" />,
    description: "Building and deploying production machine learning models.",
  },
  "scikit-learn": {
    icon: <SiScikitlearn aria-hidden="true" />,
    description: "Classical ML models, preprocessing pipelines and evaluation.",
  },
  opencv: {
    icon: <SiOpencv aria-hidden="true" />,
    description: "Real-time image processing for computer vision pipelines.",
  },
  langchain: {
    icon: <SiLangchain aria-hidden="true" />,
    description: "LLM applications and retrieval pipelines.",
    featured: true,
  },
  llms: {
    icon: <BotMessageSquare aria-hidden="true" />,
    description: "Prompting, fine-tuning and integrating large language models.",
    featured: true,
  },
  rag: {
    icon: <DatabaseZap aria-hidden="true" />,
    description: "Grounding model responses in retrieved, domain-specific knowledge.",
    featured: true,
  },
  vlms: {
    icon: <ScanEye aria-hidden="true" />,
    description: "Multimodal models that reason jointly over images and text.",
    featured: true,
  },
  java: {
    icon: <FaJava aria-hidden="true" />,
    description: "Object-oriented and enterprise application development.",
    featured: true,
  },
  "spring boot": {
    icon: <SiSpringboot aria-hidden="true" />,
    description: "REST APIs, services and backend systems.",
    featured: true,
  },
  fastapi: {
    icon: <SiFastapi aria-hidden="true" />,
    description: "High-performance Python APIs and AI services.",
    featured: true,
  },
  "node.js": {
    icon: <SiNodedotjs aria-hidden="true" />,
    description: "Server-side JavaScript for APIs and backend services.",
  },
  react: {
    icon: <FaReact aria-hidden="true" />,
    description: "Component-based, state-driven application interfaces.",
    featured: true,
  },
  "next.js": {
    icon: <SiNextdotjs aria-hidden="true" />,
    description: "Production-ready, server-rendered React applications.",
    featured: true,
  },
  typescript: {
    icon: <SiTypescript aria-hidden="true" />,
    description: "Type-safe, maintainable modern web development.",
    featured: true,
  },
  javascript: {
    icon: <SiJavascript aria-hidden="true" />,
    description: "Core scripting for interactive, dynamic web applications.",
  },
  "tailwind css": {
    icon: <SiTailwindcss aria-hidden="true" />,
    description: "Utility-first styling for consistent, responsive interfaces.",
  },
  graphql: {
    icon: <SiGraphql aria-hidden="true" />,
    description: "Typed, flexible APIs for precise client data fetching.",
  },
  sql: {
    icon: <FaDatabase aria-hidden="true" />,
    description: "Schema design, queries and relational data modeling.",
    featured: true,
  },
  postgresql: {
    icon: <SiPostgresql aria-hidden="true" />,
    description: "Relational data modeling and reliable persistence.",
    featured: true,
  },
  mysql: {
    icon: <SiMysql aria-hidden="true" />,
    description: "Relational databases for transactional application data.",
  },
  mongodb: {
    icon: <SiMongodb aria-hidden="true" />,
    description: "Document-based storage for flexible, evolving schemas.",
  },
  redis: {
    icon: <SiRedis aria-hidden="true" />,
    description: "In-memory caching and fast key-value data access.",
  },
  docker: {
    icon: <FaDocker aria-hidden="true" />,
    description: "Containerization and reproducible deployment environments.",
    featured: true,
  },
  kubernetes: {
    icon: <SiKubernetes aria-hidden="true" />,
    description: "Orchestrating and scaling containerized services.",
  },
  aws: {
    icon: <FaAws aria-hidden="true" />,
    description: "Cloud infrastructure for hosting and scaling applications.",
  },
  git: {
    icon: <FaGitAlt aria-hidden="true" />,
    description: "Version control and collaborative development workflows.",
    featured: true,
  },
  flutter: {
    icon: <SiFlutter aria-hidden="true" />,
    description: "Cross-platform mobile apps from a single codebase.",
    featured: true,
  },
};

/* ==========================================================================
   API → UI mapping
   ========================================================================== */

function normalizeKey(name: string): string {
  return name.trim().toLowerCase();
}

function mapApiSkill(skill: SkillApiResponse): Skill {
  const metadata = skillMetadataList[normalizeKey(skill.name)];
  const adminDescription = skill.description?.trim();

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
    // Admin-written description (from admin.html) always wins if present —
    // the hardcoded list below is only a fallback for skills that haven't
    // been given one yet.
    description:
      (adminDescription && adminDescription.length > 0 ? adminDescription : undefined) ??
      metadata?.description ??
      "Applied in production systems as part of the engineering stack.",
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

                {/* All skills in this category — one scrollable row, consistent cards */}
                {activeSkills.length > 0 && (
                  <motion.div
                    variants={gridVariants}
                    initial="initial"
                    animate="animate"
                    className="scrollbar-thin mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-3 pt-2"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)",
                      maskImage:
                        "linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)",
                    }}
                  >
                    {activeSkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        variants={itemVariants}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        whileHover={{ y: -4 }}
                        className="group relative flex w-[220px] shrink-0 snap-start flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50/60 p-4 shadow-[0_8px_30px_-24px_rgba(24,24,27,0.35)] transition-[colors,box-shadow] duration-300 hover:border-blue-300 hover:shadow-[0_20px_45px_-24px_rgba(37,99,235,0.35)] dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/60 dark:hover:border-blue-900 dark:hover:shadow-[0_20px_45px_-24px_rgba(37,99,235,0.3)] sm:w-[250px]"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 transition-transform duration-300 group-hover:scale-x-100"
                        />
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-base text-white transition-transform duration-300 group-hover:scale-105 dark:bg-white dark:text-zinc-950">
                            {skill.icon}
                          </div>
                          <h4 className="truncate text-sm font-bold text-zinc-950 dark:text-white">
                            {skill.name}
                          </h4>
                        </div>
                        <p
                          className="text-xs leading-5 text-zinc-500 dark:text-zinc-500"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {skill.description}
                        </p>
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
