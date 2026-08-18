"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";

import { getNotes, NoteApiResponse } from "@/lib/api/notes";

export default function Notes() {
  const [notes, setNotes] = useState<NoteApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadNotes() {
      try {
        setLoading(true);
        setError(null);

        const data = await getNotes();

        if (mounted) {
          setNotes(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load notes.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadNotes();

    return () => {
      mounted = false;
    };
  }, []);

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-9 bg-blue-600 dark:bg-blue-400"
            />

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Notes
            </span>
          </div>

          <h2
            id="notes-heading"
            className="
              mt-6
              text-4xl
              font-black
              leading-[1.06]
              tracking-[-0.035em]
              text-zinc-950
              dark:text-white
              sm:text-5xl
              md:text-6xl
            "
          >
            Engineering knowledge,
            <span
              className="
                block
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
              documented.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400 md:text-lg">
            Practical notes on AI, backend engineering, software
            architecture, and the technologies I work with.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-14">
          {/* Loading */}
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-64
                    animate-pulse
                    rounded-3xl
                    border
                    border-zinc-200
                    bg-zinc-100
                    dark:border-zinc-800
                    dark:bg-zinc-900
                  "
                />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              role="alert"
              className="
                rounded-2xl
                border
                border-red-200
                bg-red-50
                p-6
                text-sm
                text-red-700
                dark:border-red-900/50
                dark:bg-red-950/30
                dark:text-red-400
              "
            >
              Unable to load notes right now.
            </div>
          )}

          {/* Empty */}
          {!loading && !error && notes.length === 0 && (
            <div
              className="
                rounded-2xl
                border
                border-zinc-200
                bg-zinc-50
                p-8
                text-center
                dark:border-zinc-800
                dark:bg-zinc-900
              "
            >
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No published notes available yet.
              </p>
            </div>
          )}

          {/* Notes */}
          {!loading && !error && notes.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note, index) => (
                <motion.article
                  key={note.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="
                    group
                    flex
                    min-h-[280px]
                    flex-col
                    rounded-3xl
                    border
                    border-zinc-200/80
                    bg-white
                    p-6
                    shadow-[0_15px_50px_-30px_rgba(24,24,27,0.35)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:shadow-[0_25px_60px_-30px_rgba(37,99,235,0.3)]
                    dark:border-zinc-800
                    dark:bg-zinc-900/70
                    dark:hover:border-zinc-700
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      dark:bg-blue-950/50
                      dark:text-blue-400
                    "
                  >
                    <FaBookOpen aria-hidden="true" />
                  </div>

                  {/* Category */}
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                    {note.category}
                  </p>

                  {/* Title */}
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                    {note.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {note.summary}
                  </p>

                  {/* Read link */}
                  <div className="mt-auto pt-6">
                    <a
                      href={`/notes/${note.slug}?from=notes`}
                      className="
                        group/link
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-bold
                        text-blue-600
                        transition-colors
                        hover:text-blue-700
                        dark:text-blue-400
                        dark:hover:text-blue-300
                      "
                    >
                      Read note
                      <FaArrowRight
                        aria-hidden="true"
                        className="
                          text-xs
                          transition-transform
                          duration-300
                          group-hover/link:translate-x-1
                        "
                      />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}