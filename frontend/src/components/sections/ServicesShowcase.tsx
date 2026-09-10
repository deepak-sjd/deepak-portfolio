"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBrain,
  FaCamera,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaGithub,
  FaPlay,
  FaProjectDiagram,
  FaServer,
} from "react-icons/fa";

import {
  getServices,
  type ServiceApiResponse,
} from "@/lib/api/services";
import type { ProjectApiResponse } from "@/lib/api/projects";

/* ==========================================================================
   Icon mapping — identical to Services.tsx, so an icon means the same thing
   everywhere on the site rather than drifting between components.
   ========================================================================== */

type ServiceIcon =
  | typeof FaBrain
  | typeof FaServer
  | typeof FaCamera
  | typeof FaProjectDiagram;

function getServiceIcon(icon: string): ServiceIcon {
  switch (icon.toLowerCase()) {
    case "server":
      return FaServer;
    case "camera":
      return FaCamera;
    case "workflow":
      return FaProjectDiagram;
    case "brain":
    default:
      return FaBrain;
  }
}

function parseTechnologies(csv: string): string[] {
  return csv
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/* ==========================================================================
   Decorative engineering-grid backdrop — a self-contained CSS pattern with
   connecting dots, used behind Proof of Work instead of an external project
   image. It never fails to load, never looks broken, and gives the card
   visual richness on its own regardless of whether any project has a real
   screenshot yet.
   ========================================================================== */

function EngineeringGridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-60 dark:opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(59,130,246,0.35) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
      }}
    />
  );
}

/* ==========================================================================
   Proof-of-Work — the featured related project plus any extras
   ========================================================================== */

function ProofOfWorkLink({
  href,
  icon: Icon,
  label,
  variant,
}: {
  href: string | null;
  icon: React.ElementType;
  label: string;
  variant: "dark" | "green" | "red";
}) {
  const variantClasses = {
    dark: "bg-zinc-900 text-white hover:bg-zinc-700",
    green: "bg-emerald-600 text-white hover:bg-emerald-700",
    red: "bg-red-600 text-white hover:bg-red-700",
  }[variant];

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#ffffff" }}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${variantClasses}`}
    >
      <Icon aria-hidden="true" style={{ color: "#ffffff" }} className="text-xs" />
      <span style={{ color: "#ffffff" }}>{label}</span>
    </a>
  );
}

function ExtraProjectRow({ project }: { project: ProjectApiResponse }) {
  const primaryUrl = project.githubUrl || project.liveUrl || project.videoUrl || null;

  return (
    <a
      href={primaryUrl ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3
        transition-all duration-200
        dark:border-white/10 dark:bg-white/5
        ${primaryUrl ? "cursor-pointer hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:hover:border-blue-400/40 dark:hover:bg-white/10" : "cursor-default opacity-50"}
      `}
    >
      <span className="truncate text-sm font-semibold text-zinc-800 dark:text-slate-200">
        {project.title}
      </span>
      <span className="flex shrink-0 items-center gap-1.5 text-zinc-400 dark:text-slate-500">
        {project.githubUrl && <FaGithub aria-hidden="true" className="text-xs" />}
        {project.liveUrl && <FaExternalLinkAlt aria-hidden="true" className="text-[10px]" />}
        {project.videoUrl && <FaPlay aria-hidden="true" className="text-[10px]" />}
      </span>
    </a>
  );
}

/* ==========================================================================
   One full panel — everything for a single service
   ========================================================================== */

function ServicePanel({ service }: { service: ServiceApiResponse }) {
  const Icon = getServiceIcon(service.icon ?? "brain");
  const technologies = parseTechnologies(service.technologies);
  const visibleTech = technologies.slice(0, 6);
  const extraTechCount = technologies.length - visibleTech.length;

  const [featured, ...rest] = service.relatedProjects;

  // "See it in Action" should actually land somewhere meaningful, not just
  // scroll a few hundred pixels to a card already on screen. Prefer sending
  // the visitor to the real, live, working thing; fall back sensibly.
  const ctaHref = featured?.liveUrl || featured?.githubUrl || "#proof-of-work";
  const ctaIsExternal = ctaHref !== "#proof-of-work";
  const ctaLabel = featured?.liveUrl
    ? "See it Live"
    : featured?.githubUrl
      ? "View the Code"
      : "See the Details";

  return (
    // items-start (not items-center) — items-center was stretching the text
    // column to vertically center against the tall image column, which is
    // what caused the large empty gap above "Featured Service".
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
      {/* Left — pitch */}
      <div>
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-blue-600 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-1 dark:ring-inset dark:ring-blue-400/20">
          Featured Service
        </span>

        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
            <Icon aria-hidden="true" className="text-xl" />
          </div>
          <h2 className="text-2xl font-black leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
            {service.title.split(" ").map((word, i) => (
              <span key={i} className={i === 0 ? "" : "text-blue-600 dark:text-blue-400"}>
                {word}{" "}
              </span>
            ))}
          </h2>
        </div>

        <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-600 dark:text-slate-400 sm:text-base">
          {service.description}
        </p>

        {visibleTech.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {visibleTech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/20">
                  <FaCheck aria-hidden="true" className="text-[7px] text-blue-600 dark:text-blue-300" />
                </span>
                {tech}
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium text-zinc-400 dark:text-slate-500">
                +{extraTechCount} more
              </span>
            )}
          </div>
        )}

        <a
          href={ctaHref}
          target={ctaIsExternal ? "_blank" : undefined}
          rel={ctaIsExternal ? "noopener noreferrer" : undefined}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          {ctaLabel}
          <FaArrowRight aria-hidden="true" className="text-xs" />
        </a>
      </div>

      {/* Right — the proof, now the primary element of this column */}
      <div>
        <div
          id="proof-of-work"
          className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm sm:p-8"
        >
          <EngineeringGridBackdrop />

          <div className="relative">
            {featured ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20">
                    <FaFolderOpen aria-hidden="true" className="text-lg" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-slate-500">
                    Proof of Work
                  </p>
                </div>

                <h3 className="mt-5 text-xl font-black leading-tight text-zinc-950 dark:text-white">
                  {featured.title}
                </h3>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-zinc-600 dark:text-slate-400 sm:text-base">
                  {featured.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <ProofOfWorkLink href={featured.githubUrl} icon={FaGithub} label="View GitHub" variant="dark" />
                  <ProofOfWorkLink href={featured.liveUrl} icon={FaExternalLinkAlt} label="Live Demo" variant="green" />
                  <ProofOfWorkLink href={featured.videoUrl} icon={FaPlay} label="Watch Video" variant="red" />
                </div>

                {rest.length > 0 && (
                  <div className="mt-6 space-y-2 border-t border-zinc-100 pt-6 dark:border-white/10">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-slate-500">
                      Also built for this
                    </p>
                    {rest.map((project) => (
                      <ExtraProjectRow key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-white/10 dark:text-slate-500">
                  <FaFolderOpen aria-hidden="true" className="text-lg" />
                </div>
                <p className="mt-4 text-sm font-semibold text-zinc-500 dark:text-slate-400">
                  Proof of work coming soon for this service.
                </p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-slate-600">
                  Real projects will show up here as they&apos;re linked.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Services Showcase — now fully theme-adaptive (light AND dark look
   intentional and polished), not hardcoded dark. That's what fixes the
   navbar-contrast bug: whatever theme the site is in, this section matches
   it, so the navbar's theme-aware text color always has correct contrast.
   ========================================================================== */

const SWIPE_THRESHOLD = 60;

export default function ServicesShowcase() {
  const [services, setServices] = useState<ServiceApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    getServices()
      .then((data) => {
        if (mounted) setServices(data);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to load services.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const goTo = (nextIndex: number) => {
    if (nextIndex === index || services.length === 0) return;
    const wrapped = (nextIndex + services.length) % services.length;
    setDirection(wrapped > index ? 1 : -1);
    setIndex(wrapped);
  };

  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  useEffect(() => {
    if (services.length < 2) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, services.length]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
  };

  const scrollStrip = (delta: number) => {
    stripRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="relative isolate overflow-hidden border-t border-zinc-200/70 bg-white py-20 dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-950 dark:via-[#0a1128] dark:to-slate-950 sm:py-24">
      {/* Ambient glow accents — subtle in light mode, richer in dark mode */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-[120px] dark:bg-blue-600/20" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-[120px] dark:bg-indigo-600/15" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-9 bg-blue-600 dark:bg-blue-400" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Services
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-black leading-[1.06] tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-5xl">
            Engineering solutions for
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400">
              real-world problems.
            </span>
          </h1>
        </div>

        {loading && (
          <div className="flex h-[420px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent dark:border-blue-400" />
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300">
            Unable to load services right now.
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center text-sm text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            No services published yet.
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <>
            <div className="relative">
              {services.length > 1 && (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous service"
                  className="absolute left-0 top-1/2 z-10 hidden -translate-x-16 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white p-3 shadow-lg transition-transform hover:scale-110 dark:border-white/10 dark:bg-white/10 dark:backdrop-blur-sm dark:hover:bg-white/20 xl:flex"
                >
                  <FaChevronLeft aria-hidden="true" className="text-sm text-zinc-600 dark:text-white" />
                </button>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={services[index].id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag={services.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                >
                  <ServicePanel service={services[index]} />
                </motion.div>
              </AnimatePresence>

              {services.length > 1 && (
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next service"
                  className="absolute right-0 top-1/2 z-10 hidden translate-x-16 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white p-3 shadow-lg transition-transform hover:scale-110 dark:border-white/10 dark:bg-white/10 dark:backdrop-blur-sm dark:hover:bg-white/20 xl:flex"
                >
                  <FaChevronRight aria-hidden="true" className="text-sm text-zinc-600 dark:text-white" />
                </button>
              )}
            </div>

            {services.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {services.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${s.title}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-blue-600 dark:bg-blue-400"
                        : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-white/20 dark:hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}

            {services.length > 1 && (
              <div className="relative mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollStrip(-280)}
                  aria-label="Scroll services left"
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-blue-400/30 dark:hover:text-white sm:flex"
                >
                  <FaArrowLeft aria-hidden="true" className="text-xs" />
                </button>

                <div
                  ref={stripRef}
                  className="hide-scrollbar flex flex-1 gap-3 overflow-x-auto scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <style jsx>{`
                    .hide-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>

                  {services.map((s, i) => {
                    const Icon = getServiceIcon(s.icon ?? "brain");
                    const isActive = i === index;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => goTo(i)}
                        className={`
                          flex w-64 shrink-0 items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200
                          ${isActive
                            ? "border-blue-300 bg-blue-50 dark:border-blue-400/40 dark:bg-blue-500/10"
                            : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"}
                        `}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-zinc-100 text-zinc-500 dark:bg-white/10 dark:text-slate-400"
                          }`}
                        >
                          <Icon aria-hidden="true" className="text-sm" />
                        </div>
                        <div className="min-w-0">
                          <p className={`truncate text-sm font-bold ${isActive ? "text-blue-700 dark:text-blue-300" : "text-zinc-900 dark:text-white"}`}>
                            {s.title}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500 dark:text-slate-500">
                            {s.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => scrollStrip(280)}
                  aria-label="Scroll services right"
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-blue-400/30 dark:hover:text-white sm:flex"
                >
                  <FaArrowRight aria-hidden="true" className="text-xs" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
