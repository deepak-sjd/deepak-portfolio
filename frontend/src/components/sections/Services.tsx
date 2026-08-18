"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBrain,
  FaCamera,
  FaServer,
  FaProjectDiagram,
} from "react-icons/fa";

import {
  getServices,
  type ServiceApiResponse,
} from "@/lib/api/services";

/* ==========================================================================
   Types
   ========================================================================== */

type ServiceIcon =
  | typeof FaBrain
  | typeof FaServer
  | typeof FaCamera
  | typeof FaProjectDiagram;

/* ==========================================================================
   Icon Mapping
   ========================================================================== */

function getServiceIcon(icon: string): ServiceIcon {
  switch (icon.toLowerCase()) {
    case "brain":
      return FaBrain;

    case "server":
      return FaServer;

    case "camera":
      return FaCamera;

    case "workflow":
      return FaProjectDiagram;

    default:
      return FaBrain;
  }
}

/* ==========================================================================
   Services Section
   ========================================================================== */

export default function Services() {
  const [services, setServices] = useState<ServiceApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ------------------------------------------------------------------------
     Load services
     ------------------------------------------------------------------------ */

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError(null);

        const data = await getServices();

        const sortedServices = [...data].sort(
          (a, b) => a.displayOrder - b.displayOrder,
        );

        setServices(sortedServices);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load services.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
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
      {/* ================================================================== */}
      {/* BACKGROUND ATMOSPHERE */}
      {/* ================================================================== */}

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

      {/* ================================================================== */}
      {/* CONTENT */}
      {/* ================================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ================================================================= */}
        {/* HEADER */}
        {/* ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
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
              Services
            </span>
          </div>

          <h2
            id="services-heading"
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
            Engineering solutions for{" "}
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
              real-world problems.
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
            I build production-oriented AI and software systems that
            combine intelligent models, scalable backend services,
            APIs, databases, and automation.
          </p>
        </motion.div>

        {/* ================================================================= */}
        {/* LOADING */}
        {/* ================================================================= */}

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
              shadow-sm
              dark:border-zinc-800
              dark:bg-zinc-900
              dark:text-zinc-400
            "
          >
            Loading services...
          </div>
        )}

        {/* ================================================================= */}
        {/* ERROR */}
        {/* ================================================================= */}

        {error && (
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

        {/* ================================================================= */}
        {/* SERVICES GRID */}
        {/* ================================================================= */}

        {!loading && !error && services.length > 0 && (
          <div
            className="
              mt-14
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.icon ?? "");

              const technologies = service.technologies
                .split(",")
                .map((technology) => technology.trim())
                .filter(Boolean);

              return (
                <motion.article
                  key={service.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="
                    group relative
                    flex h-full
                    flex-col
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

                  {/* Icon */}

                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-xl
                      border border-blue-100
                      bg-blue-50
                      text-blue-600
                      transition-all duration-300
                      group-hover:scale-105
                      group-hover:bg-blue-600
                      group-hover:text-white
                      dark:border-blue-900/50
                      dark:bg-blue-950/30
                      dark:text-blue-400
                      dark:group-hover:bg-blue-500
                      dark:group-hover:text-white
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="text-lg"
                    />
                  </div>

                  {/* Category */}

                  <p
                    className="
                      mt-6
                      text-[10px] font-bold
                      uppercase
                      tracking-[0.18em]
                      text-blue-600
                      dark:text-blue-400
                    "
                  >
                    {service.category}
                  </p>

                  {/* Title */}

                  <h3
                    className="
                      mt-3
                      text-xl font-bold
                      leading-tight
                      tracking-tight
                      text-zinc-950
                      dark:text-white
                    "
                  >
                    {service.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-4
                      text-sm leading-7
                      text-zinc-600
                      dark:text-zinc-400
                    "
                  >
                    {service.description}
                  </p>

                  {/* Technologies */}

                  <div className="mt-6">
                    <p
                      className="
                        mb-3
                        text-[10px] font-bold
                        uppercase
                        tracking-[0.18em]
                        text-zinc-400
                      "
                    >
                      Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {technologies.map((technology) => (
                        <span
                          key={technology}
                          className="
                            rounded-lg
                            border border-zinc-200
                            bg-zinc-50
                            px-2.5 py-1.5
                            text-[11px] font-semibold
                            text-zinc-600
                            transition-colors duration-200
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

                  {/* Bottom indicator */}

                  <div
                    className="
                      mt-auto
                      pt-7
                    "
                  >
                    <div
                      className="
                        flex items-center
                        gap-2
                        text-xs font-semibold
                        text-zinc-400
                        transition-colors duration-300
                        group-hover:text-blue-600
                        dark:group-hover:text-blue-400
                      "
                    >
                      <span>Available for projects</span>

                      <FaArrowRight
                        aria-hidden="true"
                        className="
                          text-[10px]
                          transition-transform duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* ================================================================= */}
        {/* EMPTY */}
        {/* ================================================================= */}

        {!loading && !error && services.length === 0 && (
          <div
            className="
              mt-14
              rounded-2xl
              border border-zinc-200
              bg-zinc-50
              p-8
              text-center
              text-sm
              text-zinc-500
              dark:border-zinc-800
              dark:bg-zinc-900/50
              dark:text-zinc-400
            "
          >
            No services available.
          </div>
        )}

        {/* ================================================================= */}
        {/* CTA */}
        {/* ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="
            mt-12
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
              Have a project in mind?
            </p>

            <p
              className="
                mt-1.5
                text-sm
                text-zinc-500
                dark:text-zinc-400
              "
            >
              Let&apos;s discuss how I can help build it.
            </p>
          </div>

          <a
            href="#contact"
            className="
              group inline-flex shrink-0
              items-center gap-2
              rounded-xl
              bg-blue-600
              px-5 py-3
              text-sm font-semibold
              text-white
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-blue-700
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-zinc-950
            "
          >
            Start a conversation

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