"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { motion } from "framer-motion";

import {
  getProjects,
  type ProjectApiResponse,
} from "@/lib/api/projects";

import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaPlay,
} from "react-icons/fa";

type Project = {
  title: string;
  category: string;
  eyebrow: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  status: "Production Focus" | "Engineering Project" | "Concept";
};

const projectMetadata: Record<
  string,
  Pick<Project, "category" | "eyebrow" | "status">
> = {
  "Smart Manufacturing Time Study AI": {
    category: "Computer Vision",
    eyebrow: "Industrial AI · Activity Recognition",
    status: "Production Focus",
  },

  "Enterprise RAG Document Assistant": {
    category: "Generative AI",
    eyebrow: "RAG · Enterprise Knowledge",
    status: "Engineering Project",
  },

  "AI Fault Investigation Assistant": {
    category: "Enterprise AI",
    eyebrow: "RAG · Engineering Intelligence",
    status: "Engineering Project",
  },

  "Natural Language → SQL Assistant": {
    category: "AI + Backend",
    eyebrow: "LLM · Data Applications",
    status: "Engineering Project",
  },

  "AI Customer Support Assistant": {
    category: "AI + Full Stack",
    eyebrow: "Conversational AI · Full Stack",
    status: "Engineering Project",
  },

  "AI Resume Analyzer": {
    category: "Generative AI",
    eyebrow: "NLP · Document Intelligence",
    status: "Concept",
  },

  "Invoice Intelligence System": {
    category: "Document AI",
    eyebrow: "OCR · Intelligent Extraction",
    status: "Concept",
  },

  "Electronic Store": {
    category: "Java Full Stack",
    eyebrow: "Backend · E-Commerce",
    status: "Engineering Project",
  },
};

function mapApiProject(project: ProjectApiResponse): Project {
  const metadata = projectMetadata[project.title];

  return {
    title: project.title,

    category:
      metadata?.category ?? "Engineering Project",

    eyebrow:
      metadata?.eyebrow ?? "Software Engineering",

    description:
      project.description,

    technologies:
      project.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),

    github:
      project.githubUrl || undefined,

    demo:
      project.liveUrl || undefined,

    featured:
      project.featured,

    status:
      metadata?.status ?? "Engineering Project",
  };
}

const categoryStyles: Record<string, string> = {
  "Computer Vision":
    "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/20",

  "Generative AI":
    "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20",

  "Enterprise AI":
    "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:ring-cyan-500/20",

  "AI + Backend":
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",

  "AI + Full Stack":
    "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/20",

  "Document AI":
    "bg-pink-50 text-pink-700 ring-pink-200 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-pink-500/20",

  "Java Full Stack":
    "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20",
};

function ProjectAction({
  href,
  label,
  icon,
  primary = false,
  projectTitle,
}: {
  href?: string;
  label: string;
  icon: ReactNode;
  primary?: boolean;
  projectTitle: string;
}) {
  const isPlaceholder = !href || href === "#";

  if (isPlaceholder) {
    return (
      <span
        aria-disabled="true"
        title={`${label} link coming soon`}
        className={`
          inline-flex cursor-not-allowed
          items-center gap-2
          rounded-xl
          px-4 py-2.5
          text-sm font-semibold
          ${
            primary
              ? "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
              : "border border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600"
          }
        `}
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
      className={`
        group/action
        inline-flex items-center gap-2
        rounded-xl
        px-4 py-2.5
        text-sm font-semibold
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500
        focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-zinc-950
        ${
          primary
            ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md"
            : "border border-zinc-300 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
        }
      `}
    >
      {icon}
      {label}
    </a>
  );
}

function ProjectVisual({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`
        relative overflow-hidden
        rounded-2xl
        border border-zinc-200/80
        bg-zinc-50
        dark:border-zinc-800
        dark:bg-zinc-950
        ${featured ? "h-48" : "h-36"}
      `}
    >
      <div
        className="
          absolute inset-0
          opacity-60
          [background-image:linear-gradient(to_right,rgba(24,24,27,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.04)_1px,transparent_1px)]
          [background-size:32px_32px]
          dark:opacity-20
        "
      />

      <div
        className="
          absolute
          left-1/2 top-1/2
          h-28 w-28
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex w-full max-w-sm items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.6)]" />

          <div className="h-px flex-1 bg-gradient-to-r from-blue-500/60 to-indigo-500/20" />

          <div
            className="
              rounded-xl
              border border-zinc-200
              bg-white/90
              px-4 py-3
              shadow-sm
              dark:border-zinc-700
              dark:bg-zinc-900/90
            "
          >
            <p
              className="
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-zinc-500
                dark:text-zinc-400
              "
            >
              {project.category}
            </p>

            <p
              className="
                mt-1
                font-mono
                text-xs
                font-bold
                text-zinc-800
                dark:text-zinc-200
              "
            >
              /system
            </p>
          </div>

          <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/20 to-blue-500/60" />

          <div className="h-2 w-2 rounded-full bg-indigo-500" />
        </div>
      </div>

      <div
        className="
          absolute left-4 top-4
          font-mono text-[10px]
          font-bold uppercase
          tracking-[0.15em]
          text-zinc-400
        "
      >
        {project.category}
      </div>

      <div
        className="
          absolute bottom-4 right-4
          h-8 w-8
          rounded-full
          border border-blue-500/20
        "
      />
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.06, 0.3),
        ease: "easeOut",
      }}
      className="
        group
        flex h-full
        flex-col
        overflow-hidden
        rounded-[1.75rem]
        border border-zinc-200/80
        bg-white/90
        p-5
        shadow-[0_12px_45px_-30px_rgba(24,24,27,0.35)]
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-[0_25px_70px_-35px_rgba(37,99,235,0.22)]
        dark:border-zinc-800
        dark:bg-zinc-900/80
        dark:shadow-none
        dark:hover:border-zinc-700
        sm:p-6
      "
    >
      <ProjectVisual project={project} />

      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`
              inline-flex rounded-full
              px-3 py-1.5
              text-[10px] font-bold
              tracking-wide
              ring-1
              ${
                categoryStyles[project.category] ??
                "bg-zinc-100 text-zinc-700 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700"
              }
            `}
          >
            {project.category}
          </span>

          <span
            className="
              font-mono
              text-[10px]
              font-bold
              text-zinc-300
              transition-colors duration-300
              group-hover:text-blue-500
              dark:text-zinc-700
              dark:group-hover:text-blue-400
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p
          className="
            mt-5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-zinc-400
            dark:text-zinc-500
          "
        >
          {project.eyebrow}
        </p>

        <h3
          className="
            mt-2
            text-xl font-bold
            leading-tight
            tracking-tight
            text-zinc-950
            dark:text-white
          "
        >
          {project.title}
        </h3>

        <p
          className="
            mt-4
            text-sm
            leading-7
            text-zinc-600
            dark:text-zinc-400
          "
        >
          {project.description}
        </p>

        <div className="mt-6">
          <p
            className="
              mb-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-zinc-400
            "
          >
            Technology
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="
                  rounded-lg
                  border border-zinc-200
                  bg-zinc-50
                  px-2.5 py-1.5
                  text-[11px]
                  font-semibold
                  text-zinc-600
                  transition-colors duration-200
                  group-hover:border-blue-100
                  group-hover:text-blue-600
                  dark:border-zinc-800
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

        <div
          className="
            mt-6
            flex items-center gap-2
            text-[11px]
            font-medium
            text-zinc-400
          "
        >
          <span
            className={`
              h-1.5 w-1.5 rounded-full
              ${
                project.status === "Production Focus"
                  ? "bg-emerald-500"
                  : project.status === "Engineering Project"
                    ? "bg-blue-500"
                    : "bg-zinc-400"
              }
            `}
          />

          {project.status}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          <ProjectAction
            href={project.github}
            label="GitHub"
            icon={<FaGithub aria-hidden="true" />}
            projectTitle={project.title}
          />

          <ProjectAction
            href={project.demo}
            label="Live Demo"
            icon={<FaPlay aria-hidden="true" />}
            primary
            projectTitle={project.title}
          />
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="
        group
        overflow-hidden
        rounded-[2rem]
        border border-zinc-200/80
        bg-white/90
        p-5
        shadow-[0_18px_70px_-35px_rgba(24,24,27,0.3)]
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-[0_30px_90px_-40px_rgba(37,99,235,0.25)]
        dark:border-zinc-800
        dark:bg-zinc-900/85
        dark:shadow-none
        dark:hover:border-zinc-700
        sm:p-6
        lg:p-7
      "
    >
      <div className="grid items-stretch gap-7 lg:grid-cols-[1fr_1.05fr]">
        <ProjectVisual project={project} featured />

        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <span
              className={`
                inline-flex rounded-full
                px-3 py-1.5
                text-[10px] font-bold
                tracking-wide
                ring-1
                ${
                  categoryStyles[project.category] ??
                  "bg-zinc-100 text-zinc-700 ring-zinc-200"
                }
              `}
            >
              {project.category}
            </span>

            <span
              className="
                inline-flex items-center gap-2
                text-[10px] font-bold
                uppercase tracking-[0.15em]
                text-emerald-600
                dark:text-emerald-400
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Featured
            </span>
          </div>

          <p
            className="
              mt-6
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-zinc-400
            "
          >
            {project.eyebrow}
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-black
              leading-tight
              tracking-tight
              text-zinc-950
              dark:text-white
              sm:text-3xl
            "
          >
            {project.title}
          </h3>

          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-zinc-600
              dark:text-zinc-400
              sm:text-[15px]
            "
          >
            {project.description}
          </p>

          <div className="mt-6">
            <p
              className="
                mb-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-400
              "
            >
              Technology
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="
                    rounded-lg
                    border border-zinc-200
                    bg-zinc-50
                    px-2.5 py-1.5
                    text-[11px]
                    font-semibold
                    text-zinc-600
                    dark:border-zinc-800
                    dark:bg-zinc-950
                    dark:text-zinc-400
                  "
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <ProjectAction
              href={project.github}
              label="View GitHub"
              icon={<FaGithub aria-hidden="true" />}
              projectTitle={project.title}
            />

            <ProjectAction
              href={project.demo}
              label="View Demo"
              icon={<FaExternalLinkAlt aria-hidden="true" />}
              primary
              projectTitle={project.title}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjects();

        setProjects(data.map(mapApiProject));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load projects."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  const standardProjects = projects.filter(
    (project) => !project.featured
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="
        relative overflow-hidden
        border-t border-zinc-100
        bg-zinc-50/50
        py-24
        dark:border-zinc-900
        dark:bg-zinc-950
        sm:py-28
        lg:py-32
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-0
          h-[500px] w-[800px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.035]
          blur-[130px]
          dark:bg-blue-500/[0.045]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.25]
          [background-image:linear-gradient(to_right,rgba(24,24,27,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.03)_1px,transparent_1px)]
          [background-size:64px_64px]
          dark:opacity-0
        "
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
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
                text-xs font-bold
                uppercase tracking-[0.22em]
                text-blue-600
                dark:text-blue-400
              "
            >
              Selected Projects
            </span>
          </div>

          <h2
            id="projects-heading"
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
            Engineering ideas into{" "}
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
              working systems.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-zinc-600
              dark:text-zinc-400
              md:text-lg
            "
          >
            A selection of AI, backend, and full-stack projects focused on
            solving practical problems through thoughtful engineering,
            intelligent automation, and reliable software systems.
          </p>
        </motion.div>

        {/* LOADING */}

        {loading && (
          <div
            className="
              mt-14
              rounded-2xl
              border border-zinc-200
              bg-white
              p-8
              text-center
              text-sm
              text-zinc-500
              dark:border-zinc-800
              dark:bg-zinc-900
              dark:text-zinc-400
            "
          >
            Loading projects...
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div
            className="
              mt-14
              rounded-2xl
              border border-red-200
              bg-red-50
              p-8
              text-center
              text-sm
              text-red-600
              dark:border-red-900/50
              dark:bg-red-950/20
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* PROJECT CONTENT */}

        {!loading && !error && (
          <>
            {/* FEATURED PROJECTS */}

            {featuredProjects.length > 0 && (
              <div className="mt-14 space-y-6 lg:mt-16">
                {featuredProjects.map((project, index) => (
                  <FeaturedProject
                    key={project.title}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* OTHER PROJECTS */}

            {standardProjects.length > 0 && (
              <div className="mt-16">
                <div className="mb-7 flex items-end justify-between gap-5">
                  <div>
                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-zinc-400
                      "
                    >
                      More Engineering Work
                    </p>

                    <h3
                      className="
                        mt-2
                        text-2xl
                        font-bold
                        tracking-tight
                        text-zinc-950
                        dark:text-white
                      "
                    >
                      Other projects
                    </h3>
                  </div>

                  <span
                    className="
                      hidden
                      text-xs
                      font-medium
                      text-zinc-400
                      sm:block
                    "
                  >
                    {standardProjects.length} projects
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {standardProjects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* EMPTY STATE */}

            {projects.length === 0 && (
              <div
                className="
                  mt-14
                  rounded-2xl
                  border border-zinc-200
                  bg-white
                  p-8
                  text-center
                  text-sm
                  text-zinc-500
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:text-zinc-400
                "
              >
                No projects available.
              </div>
            )}
          </>
        )}

        {/* BOTTOM CTA */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.55,
            delay: 0.1,
          }}
          className="
            mt-14
            flex flex-col
            items-start
            justify-between
            gap-5
            rounded-[1.5rem]
            border border-zinc-200/80
            bg-white/80
            p-6
            shadow-sm
            backdrop-blur
            dark:border-zinc-800
            dark:bg-zinc-900/60
            sm:flex-row
            sm:items-center
            sm:p-7
          "
        >
          <div>
            <p
              className="
                text-sm font-bold
                text-zinc-950
                dark:text-white
              "
            >
              Want to see the implementation?
            </p>

            <p
              className="
                mt-1.5
                text-sm
                leading-6
                text-zinc-500
                dark:text-zinc-400
              "
            >
              Explore the source code, architecture, and technical decisions
              behind my projects.
            </p>
          </div>

          <a
            href="https://github.com/deepak-sjd"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex shrink-0
              items-center gap-2
              rounded-xl
              bg-zinc-950
              px-5 py-3
              text-sm font-semibold
              text-white
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-zinc-800
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
              dark:bg-white
              dark:text-zinc-950
              dark:hover:bg-zinc-200
              dark:focus-visible:ring-offset-zinc-950
            "
          >
            <FaGithub aria-hidden="true" />

            View GitHub

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