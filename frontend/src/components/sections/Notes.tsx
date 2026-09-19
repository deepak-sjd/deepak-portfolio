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
              mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight
              text-zinc-950 dark:text-white sm:text-4xl
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

          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">            A structured knowledge base of everything I work with — organized
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
                    {/*
                      ONE plain <Link> wraps the entire card — this is the
                      whole fix. No nested motion.span layers, no variant
                      propagation to worry about: every pixel inside this
                      anchor tag is clickable, guaranteed, the same way the
                      "Explore topics" text always was.
                    */}
                    <Link
                      href={`/notes/${field.slug}`}
                      className="
                        group relative flex h-full min-h-[280px] flex-col
                        overflow-hidden rounded-3xl border border-zinc-200/80
                        bg-white p-6 shadow-[0_15px_50px_-30px_rgba(24,24,27,0.35)]
                        outline-none transition-all duration-300
                        hover:-translate-y-1 hover:border-blue-200
                        hover:shadow-[0_25px_60px_-30px_rgba(37,99,235,0.3)]
                        focus-visible:ring-2 focus-visible:ring-blue-500
                        focus-visible:ring-offset-2
                        dark:border-zinc-800 dark:bg-zinc-900/70
                        dark:hover:border-zinc-700
                        dark:focus-visible:ring-offset-zinc-950
                      "
                    >
                      {/* Large tech-stack icon watermark — purely decorative */}
                      <Icon
                        aria-hidden="true"
                        className="
                          pointer-events-none absolute -right-6 -top-6
                          text-[7rem] text-blue-50
                          transition-transform duration-500 ease-out
                          group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-6
                          dark:text-blue-500/[0.07]
                        "
                      />

                      <div className="relative z-10 flex flex-1 flex-col">
                        <div className="flex items-center justify-between">
                          <div
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
                          </div>

                          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                                               <h3
                          className="
                            mt-6 font-serif text-xl font-semibold leading-tight text-zinc-950
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
                      </div>
                    </Link>
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
