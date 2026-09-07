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
   Device mockup — pure CSS laptop frame around a project screenshot
   ========================================================================== */

function DeviceMockup({ project }: { project: ProjectApiResponse | undefined }) {
  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-t-2xl border-[10px] border-b-0 border-slate-700 bg-slate-800 p-1 shadow-2xl">
        <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-950">
          {project?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <p className="px-6 text-center text-sm font-medium text-slate-500">
              {project ? "Preview coming soon" : "No linked project yet"}
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto h-3 w-full rounded-b-xl bg-gradient-to-b from-slate-600 to-slate-700" />
      <div className="mx-auto h-1.5 w-1/5 rounded-b-md bg-slate-700" />
    </div>
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
  variant: "light" | "green" | "red";
}) {
  const variantClasses = {
    light: "bg-white text-slate-900 hover:bg-slate-200",
    green: "bg-emerald-500 text-white hover:bg-emerald-400",
    red: "bg-red-500 text-white hover:bg-red-400",
  }[variant];

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${variantClasses}`}
    >
      <Icon aria-hidden="true" className="text-xs" />
      {label}
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
        flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3
        transition-all duration-200
        ${primaryUrl ? "cursor-pointer hover:border-blue-400/40 hover:bg-white/10" : "cursor-default opacity-50"}
      `}
    >
      <span className="truncate text-sm font-semibold text-slate-200">
        {project.title}
      </span>
      <span className="flex shrink-0 items-center gap-1.5 text-slate-500">
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

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      {/* Left — pitch */}
      <div>
        <span className="inline-block rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-blue-300 ring-1 ring-inset ring-blue-400/20">
          Featured Service
        </span>

        <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
          <Icon aria-hidden="true" className="text-2xl" />
        </div>

        <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
          {service.title.split(" ").map((word, i) => (
            <span key={i} className={i === 0 ? "" : "text-blue-400"}>
              {word}{" "}
            </span>
          ))}
        </h2>

        <p className="mt-4 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
          {service.description}
        </p>

        {visibleTech.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {visibleTech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300"
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500/20">
                  <FaCheck aria-hidden="true" className="text-[7px] text-blue-300" />
                </span>
                {tech}
              </span>
            ))}
            {extraTechCount > 0 && (
              <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium text-slate-500">
                +{extraTechCount} more
              </span>
            )}
          </div>
        )}

        <a
          href="#proof-of-work"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-400"
        >
          View Proof of Work
          <FaArrowRight aria-hidden="true" className="text-xs" />
        </a>
      </div>

      {/* Right — the proof */}
      <div>
        <DeviceMockup project={featured} />

        <div
          id="proof-of-work"
          className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
        >
          {featured ? (
            <>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Proof of Work
              </p>
              <h3 className="mt-2 text-lg font-bold text-white">
                {featured.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                {featured.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ProofOfWorkLink href={featured.githubUrl} icon={FaGithub} label="View GitHub" variant="light" />
                <ProofOfWorkLink href={featured.liveUrl} icon={FaExternalLinkAlt} label="Live Demo" variant="green" />
                <ProofOfWorkLink href={featured.videoUrl} icon={FaPlay} label="Watch Video" variant="red" />
              </div>

              {rest.length > 0 && (
                <div className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Also built for this
                  </p>
                  {rest.map((project) => (
                    <ExtraProjectRow key={project.id} project={project} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-6 text-center">
              <p className="text-sm font-semibold text-slate-400">
                Proof of work coming soon for this service.
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Real projects will show up here as they&apos;re linked.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Services Showcase — the full horizontal-panel-scroll experience
   ========================================================================== */

const SWIPE_THRESHOLD = 60;

export default function ServicesShowcase() {
  const [services, setServices] = useState<ServiceApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = came from the right, 1 = came from the left
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

  // Keyboard navigation
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
    <section className="relative overflow-hidden bg-white py-20 dark:bg-zinc-950 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — stays in the site's normal light/dark palette */}
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
          <div className="flex h-[420px] items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            Unable to load services right now.
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            No services published yet.
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <>
            {/*
              Everything below is a single, fixed-dark "showcase" surface —
              deliberately breaking from the site's light/dark toggle, the
              same way a spotlight section on a premium site often does.
              Sub-elements sit on it as translucent glass, not separate
              bordered boxes, so it reads as one panel instead of a stack of
              nested cards.
            */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a1128] to-slate-950 p-6 shadow-2xl sm:p-10">
              {/* Ambient glow accents */}
              <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-[100px]" />

              <div className="relative">
                {services.length > 1 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous service"
                    className="absolute left-0 top-1/2 z-10 hidden -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 p-3 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/20 lg:flex"
                  >
                    <FaChevronLeft aria-hidden="true" className="text-sm text-white" />
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
                    className="absolute right-0 top-1/2 z-10 hidden translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 p-3 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/20 lg:flex"
                  >
                    <FaChevronRight aria-hidden="true" className="text-sm text-white" />
                  </button>
                )}
              </div>

              {/* Pagination dots */}
              {services.length > 1 && (
                <div className="relative mt-8 flex items-center justify-center gap-2">
                  {services.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to ${s.title}`}
                      aria-current={i === index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index ? "w-8 bg-blue-400" : "w-2 bg-white/20 hover:bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Bottom mini-card strip */}
              {services.length > 1 && (
                <div className="relative mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollStrip(-280)}
                    aria-label="Scroll services left"
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 backdrop-blur-sm transition-colors hover:border-blue-400/30 hover:text-white sm:flex"
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
                              ? "border-blue-400/40 bg-blue-500/10"
                              : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"}
                          `}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                              isActive ? "bg-blue-500 text-white" : "bg-white/10 text-slate-400"
                            }`}
                          >
                            <Icon aria-hidden="true" className="text-sm" />
                          </div>
                          <div className="min-w-0">
                            <p className={`truncate text-sm font-bold ${isActive ? "text-blue-300" : "text-white"}`}>
                              {s.title}
                            </p>
                            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
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
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 backdrop-blur-sm transition-colors hover:border-blue-400/30 hover:text-white sm:flex"
                  >
                    <FaArrowRight aria-hidden="true" className="text-xs" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
