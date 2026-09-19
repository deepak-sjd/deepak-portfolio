"use client";

import { resolveFileUrl } from "@/lib/api/config";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { motion } from "framer-motion";
import Image from "next/image";

import {
  getProjects,
  type ProjectApiResponse as BaseProjectApiResponse,
} from "@/lib/api/projects";

import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaPlay,
} from "react-icons/fa";

const GITHUB_PROFILE_URL = "https://github.com/deepak-sjd";

const DISPLAY_CONFIG = {
  maxVisibleTechnologies: 4,
} as const;

type ProjectApiResponse = BaseProjectApiResponse & {
  category?: string;
  tagline?: string;
};

type Project = {
  title: string;
  category: string;
  tagline?: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  imageUrl?: string;
  featured: boolean;
};

function mapApiProject(project: ProjectApiResponse): Project {
  return {
    title: project.title,
    category: project.category?.trim() || "Engineering",
    tagline: project.tagline?.trim() || undefined,
    description: project.description,
    technologies: project.technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean),
    github: project.githubUrl || undefined,
    demo: project.liveUrl || undefined,
    imageUrl: project.imageUrl
      ? resolveFileUrl(project.imageUrl)
      : undefined,
    featured: Boolean(project.featured),
  };
}

const CATEGORY_PALETTE = [
  {
    dot: "bg-blue-500",
    text: "text-blue-700 dark:text-blue-300",
  },
  {
    dot: "bg-violet-500",
    text: "text-violet-700 dark:text-violet-300",
  },
  {
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  {
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300",
  },
  {
    dot: "bg-pink-500",
    text: "text-pink-700 dark:text-pink-300",
  },
  {
    dot: "bg-cyan-500",
    text: "text-cyan-700 dark:text-cyan-300",
  },
  {
    dot: "bg-indigo-500",
    text: "text-indigo-700 dark:text-indigo-300",
  },
  {
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-300",
  },
] as const;

function hashToIndex(value: string, modulo: number): number {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) % modulo;
}

function getCategoryStyle(category: string) {
  return CATEGORY_PALETTE[
    hashToIndex(category, CATEGORY_PALETTE.length)
  ];
}

function CategoryTag({ category }: { category: string }) {
  const style = getCategoryStyle(category);

  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
      <span
        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
        aria-hidden="true"
      />
      <span className={style.text}>{category}</span>
    </span>
  );
}

function TechList({
  technologies,
  limit = DISPLAY_CONFIG.maxVisibleTechnologies,
}: {
  technologies: string[];
  limit?: number;
}) {
  const visible = technologies.slice(0, limit);
  const hidden = technologies.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((technology) => (
        <span
          key={technology}
          className="rounded-md border border-zinc-200 px-2 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
        >
          {technology}
        </span>
      ))}

      {hidden > 0 && (
        <span className="px-2 py-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-600">
          +{hidden} more
        </span>
      )}
    </div>
  );
}

function ProjectAction({
  href,
  label,
  icon,
  projectTitle,
  variant = "button",
}: {
  href?: string;
  label: string;
  icon: ReactNode;
  projectTitle: string;
  variant?: "button" | "primary" | "icon";
}) {
  const isPlaceholder = !href || href === "#";

  if (variant === "icon") {
    return (
      <span
        aria-disabled={isPlaceholder || undefined}
        title={
          isPlaceholder
            ? `${label} link coming soon`
            : `${label} — ${projectTitle}`
        }
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors duration-200 ${
          isPlaceholder
            ? "cursor-not-allowed border-zinc-200 text-zinc-300 dark:border-zinc-800 dark:text-zinc-700"
            : "border-zinc-200 text-zinc-600 hover:border-blue-300 hover:text-blue-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-blue-800 dark:hover:text-blue-400"
        }`}
      >
        {isPlaceholder ? (
          icon
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} for ${projectTitle}`}
            className="flex h-full w-full items-center justify-center"
          >
            {icon}
          </a>
        )}
      </span>
    );
  }

  if (isPlaceholder) {
    return (
      <span
        aria-disabled="true"
        title={`${label} link coming soon`}
        className={`inline-flex cursor-not-allowed items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold ${
          variant === "primary"
            ? "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
            : "border border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600"
        }`}
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} for ${projectTitle}`}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
        variant === "primary"
          ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
          : "border border-zinc-300 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

function ThumbnailFallback({ category }: { category: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950"
    >
      <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl font-light text-zinc-300 dark:text-zinc-700">
        {category.charAt(0).toUpperCase()}
      </span>

      <span className="absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-zinc-300 dark:border-zinc-700" />

      <span className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-zinc-300 dark:border-zinc-700" />
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [failed, setFailed] = useState(false);

  const showImage = Boolean(project.imageUrl) && !failed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.06,
        ease: "easeOut",
      }}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        {showImage ? (
          <Image
            src={project.imageUrl!}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            onError={() => setFailed(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <ThumbnailFallback category={project.category} />
        )}

        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <CategoryTag category={project.category} />

        <h3 className="mt-3 font-serif text-xl font-semibold leading-tight text-zinc-950 dark:text-white">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {project.tagline || project.description}
        </p>

        <div className="mt-4">
          <TechList technologies={project.technologies} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5 pt-1">
          <ProjectAction
            href={project.github}
            label="View code"
            icon={<FaGithub aria-hidden="true" />}
            projectTitle={project.title}
          />

          <ProjectAction
            href={project.demo}
            label="View demo"
            icon={<FaExternalLinkAlt aria-hidden="true" />}
            projectTitle={project.title}
            variant="primary"
          />
        </div>
      </div>
    </motion.article>
  );
}

function FilterBar({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string | null;
  onChange: (category: string | null) => void;
}) {
  if (categories.length < 2) return null;

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter projects by category"
    >
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
          active === null
            ? "bg-blue-600 text-white"
            : "border border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
            active === category
              ? "bg-blue-600 text-white"
              : "border border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProjects();

      // Remove duplicate projects by title.
      // The first occurrence is kept.
      const uniqueProjects = Array.from(
        new Map(
          data.map((project) => [
            project.title.trim().toLowerCase(),
            project,
          ])
        ).values()
      );

      setProjects(uniqueProjects.map(mapApiProject));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong loading these."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(projects.map((project) => project.category))
      ).sort(),
    [projects]
  );

  useEffect(() => {
    if (activeCategory && !categories.includes(activeCategory)) {
      setActiveCategory(null);
    }
  }, [categories, activeCategory]);

  const filteredProjects = useMemo(
    () =>
      activeCategory
        ? projects.filter(
            (project) => project.category === activeCategory
          )
        : projects,
    [projects, activeCategory]
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-zinc-100 bg-white pb-24 pt-24 dark:border-zinc-900 dark:bg-zinc-950 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32"      >

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <h2
              id="projects-heading"
              className="font-serif text-3xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-4xl"
            >
              Projects
            </h2>

              <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {loading
                ? "Loading a working record of what I've built —"
                : categories.length > 1
                  ? `${projects.length} projects, spanning ${categories.slice(0, -1).join(", ")} and ${categories[categories.length - 1]}.`
                  : `${projects.length} project${projects.length === 1 ? "" : "s"} — a working record of what I've built.`}
            </p>
          </div>

          {!loading && !error && (
            <FilterBar
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          )}
        </motion.div>

        {loading && (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800"
              >
                <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900" />

                <div className="space-y-2.5 p-5 sm:p-6">
                  <div className="h-3 w-1/4 rounded bg-zinc-100 dark:bg-zinc-900" />
                  <div className="h-4 w-2/3 rounded bg-zinc-100 dark:bg-zinc-900" />
                  <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-14 rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
            <p className="text-sm text-red-600 dark:text-red-400">
              Couldn&apos;t load projects — {error}
            </p>

            <button
              type="button"
              onClick={loadProjects}
              className="mt-4 rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredProjects.length > 0 && (
              <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            )}

            {filteredProjects.length === 0 && projects.length > 0 && (
              <div className="mt-14 rounded-lg border border-zinc-200 p-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                Nothing filed under &quot;{activeCategory}&quot; yet.
              </div>
            )}

            {projects.length === 0 && (
              <div className="mt-14 rounded-lg border border-zinc-200 p-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                No projects yet — check back soon.
              </div>
            )}
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 flex flex-col items-start justify-between gap-5 rounded-lg border border-zinc-200/80 bg-zinc-50/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/40 sm:flex-row sm:items-center sm:p-7"
        >
          <div>
            <p className="text-sm font-bold text-zinc-950 dark:text-white">
              Want to see the implementation?
            </p>

            <p className="mt-1.5 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Explore the source code, architecture, and technical decisions
              behind these projects.
            </p>
          </div>

          <a
                     
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
          >
            <FaGithub aria-hidden="true" />

            <span>View GitHub</span>

            <FaArrowRight
              aria-hidden="true"
              className="text-xs transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}