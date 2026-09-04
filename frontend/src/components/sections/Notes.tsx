"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBookOpen,
  FaBrain,
  FaCode,
  FaDatabase,
  FaDocker,
  FaMobileAlt,
  FaRobot,
  FaServer,
  FaSitemap,
} from "react-icons/fa";

import { getRootNotes, NoteSummaryApiResponse } from "@/lib/api/notes";

/**
 * Icons are matched by keyword against the Field title, since Fields are now
 * data-driven (created via the admin tool) rather than a fixed enum.
 */
function iconForField(title: string): React.ElementType {
  const t = title.toLowerCase();
  if (t.includes("generative")) return FaRobot;
  if (t.includes("machine learning")) return FaBrain;
  if (t.includes("deep learning")) return FaBrain;
  if (t.includes("python") || t.includes("engineering")) return FaCode;
  if (t.includes("backend")) return FaServer;
  if (t.includes("database")) return FaDatabase;
  if (t.includes("algorithm") || t.includes("structure")) return FaCode;
  if (t.includes("system design")) return FaSitemap;
  if (t.includes("devops")) return FaDocker;
  if (t.includes("mobile")) return FaMobileAlt;
  return FaBookOpen;
}

const MAX_FEATURED_FIELDS = 12;

// Wrapping Next's Link in motion() lets the whole card be a real, single
// <a> element while still driving hover/tap physics through framer-motion.
const MotionLink = motion.create(Link);

export default function Notes() {
  const [fields, setFields] = useState<NoteSummaryApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadFields() {
      try {
        setLoading(true);
        setError(null);
        const data = await getRootNotes();
        if (mounted) setFields(data);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load notes.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadFields();
    return () => {
      mounted = false;
    };
  }, []);

  const visibleFields = useMemo(
    () => fields.slice(0, MAX_FEATURED_FIELDS),
    [fields],
  );

  return (
    <section
      id="notes"
      aria-labelledby="notes-heading"
      className="
        relative
        border-t
        border-zinc-200/70
        bg-white
        py-24
        dark:border-zinc-800
        dark:bg-zinc-950
        sm:py-28
        lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-9 bg-blue-600 dark:bg-blue-400" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Notes
            </span>
          </div>

          <h2
            id="notes-heading"
            className="
              mt-6 text-4xl font-black leading-[1.06] tracking-[-0.035em]
              text-zinc-950 dark:text-white sm:text-5xl md:text-6xl
            "
          >
            Engineering knowledge,
            <span
              className="
                block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600
                bg-clip-text text-transparent
                dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400
              "
            >
              documented.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 md:text-lg">
            A structured knowledge base of everything I work with — organized
            by field, broken down topic by topic, with references and videos
            attached where useful.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="mt-12">
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[220px] animate-pulse rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
            >
              Unable to load notes right now.
            </div>
          )}

          {!loading && !error && fields.length === 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-10 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <FaBookOpen aria-hidden="true" className="mx-auto text-2xl text-zinc-400 dark:text-zinc-600" />
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                No published fields yet.
              </p>
            </div>
          )}

          {!loading && !error && visibleFields.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleFields.map((field, index) => {
                const Icon = iconForField(field.title);

                return (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                  >
                    <MotionLink
                      href={`/notes/${field.slug}`}
                      whileHover="hover"
                      whileTap={{ scale: 0.985 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="
                        group relative flex h-full flex-col overflow-hidden
                        rounded-3xl border border-zinc-200/80 bg-white p-6
                        shadow-[0_15px_50px_-30px_rgba(24,24,27,0.35)]
                        outline-none transition-colors duration-300
                        hover:border-blue-200 focus-visible:ring-2
                        focus-visible:ring-blue-500 focus-visible:ring-offset-2
                        dark:border-zinc-800 dark:bg-zinc-900/70
                        dark:hover:border-zinc-700
                        dark:focus-visible:ring-offset-zinc-950
                      "
                    >
                      {/* Soft gradient glow that fades in behind the content on hover */}
                      <motion.span
                        aria-hidden="true"
                        variants={{
                          hover: { opacity: 1 },
                        }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="
                          pointer-events-none absolute inset-0
                          bg-gradient-to-br from-blue-50 via-transparent to-cyan-50
                          dark:from-blue-500/[0.07] dark:via-transparent dark:to-cyan-500/[0.07]
                        "
                      />

                      {/* Card lifts and gains a colored shadow as one motion unit */}
                      <motion.span
                        aria-hidden="true"
                        variants={{
                          hover: {
                            boxShadow: "0 25px 60px -30px rgba(37,99,235,0.35)",
                          },
                        }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-none absolute inset-0 rounded-3xl"
                      />

                      <motion.span
                        variants={{ hover: { y: -6 } }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="relative flex h-full flex-col"
                      >
                        <div className="flex items-center justify-between">
                          <motion.div
                            variants={{
                              hover: { scale: 1.1, rotate: -6 },
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="
                              flex h-11 w-11 items-center justify-center rounded-xl
                              bg-blue-50 text-blue-600 ring-1 ring-blue-100
                              transition-colors duration-300
                              group-hover:bg-blue-600 group-hover:text-white
                              group-hover:ring-blue-600
                              dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-900/50
                            "
                          >
                            <Icon aria-hidden="true" className="text-base" />
                          </motion.div>

                          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3
                          className="
                            mt-6 text-xl font-bold tracking-tight text-zinc-950
                            transition-colors duration-300 group-hover:text-blue-600
                            dark:text-white dark:group-hover:text-blue-400
                          "
                        >
                          {field.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                          {field.summary}
                        </p>

                        <div className="mt-auto pt-7">
                          <span
                            className="
                              inline-flex items-center gap-2 text-sm font-bold
                              text-blue-600 transition-colors duration-300
                              group-hover:text-blue-700
                              dark:text-blue-400 dark:group-hover:text-blue-300
                            "
                          >
                            Explore topics
                            <FaArrowRight
                              aria-hidden="true"
                              className="text-xs transition-transform duration-300 group-hover:translate-x-1.5"
                            />
                          </span>
                        </div>
                      </motion.span>
                    </MotionLink>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
