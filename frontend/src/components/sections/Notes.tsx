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
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaGlobe,
  FaRobot,
  FaServer,
  FaSitemap,
  FaYoutube,
} from "react-icons/fa";

import { getNotes, NoteApiResponse, ResourceType } from "@/lib/api/notes";

const CATEGORIES = [
  "All",
  "Generative AI",
  "Machine Learning",
  "Deep Learning",
  "AI Engineering",
  "Backend",
  "Database",
  "Core CS",
  "System Design",
  "DevOps",
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Generative AI": FaRobot,
  "Machine Learning": FaBrain,
  "Deep Learning": FaBrain,
  "AI Engineering": FaRobot,
  Backend: FaServer,
  Database: FaDatabase,
  "Core CS": FaCode,
  "System Design": FaSitemap,
  DevOps: FaDocker,
};

const RESOURCE_TYPE_ICONS: Record<ResourceType, React.ElementType> = {
  PDF: FaFilePdf,
  DOCX: FaFileWord,
  IMAGE: FaFileImage,
  YOUTUBE: FaYoutube,
  WEBSITE: FaGlobe,
  OTHER: FaGlobe,
};

const MAX_FEATURED_NOTES = 6;

export default function Notes() {
  const [notes, setNotes] = useState<NoteApiResponse[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");

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

  const filteredNotes = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? notes
        : notes.filter(
            (note) => note.category === selectedCategory,
          );

    return filtered.slice(0, MAX_FEATURED_NOTES);
  }, [notes, selectedCategory]);

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
        {/* =====================================================
            HEADER
        ====================================================== */}
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
              className="
                h-px
                w-9
                bg-blue-600
                dark:bg-blue-400
              "
            />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.22em]
                text-blue-600
                dark:text-blue-400
              "
            >
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
            Practical notes on AI, backend engineering,
            system design, databases, and the technologies
            I learn and build with — with slides, references,
            and videos attached where useful.
          </p>
        </motion.div>

        {/* =====================================================
            CATEGORY FILTERS
        ====================================================== */}
        {!loading && !error && notes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="mt-10"
          >
            <div
              className="
                flex
                gap-2
                overflow-x-auto
                pb-2
                scrollbar-none
                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
              role="tablist"
              aria-label="Filter notes by category"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      shrink-0
                      rounded-full
                      border
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      transition-all
                      duration-200
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-blue-500
                      focus-visible:ring-offset-2
                      dark:focus-visible:ring-offset-zinc-950
                      ${
                        active
                          ? `
                            border-blue-600
                            bg-blue-600
                            text-white
                            shadow-sm
                            dark:border-blue-500
                            dark:bg-blue-500
                          `
                          : `
                            border-zinc-200
                            bg-white
                            text-zinc-600
                            hover:border-blue-300
                            hover:text-blue-600
                            dark:border-zinc-800
                            dark:bg-zinc-900/70
                            dark:text-zinc-400
                            dark:hover:border-blue-700
                            dark:hover:text-blue-400
                          `
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* =====================================================
            CONTENT
        ====================================================== */}
        <div className="mt-12">
          {/* Loading */}
          {loading && (
            <div
              className="
                grid
                gap-6
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-[310px]
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
          {!loading &&
            !error &&
            notes.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-zinc-200
                  bg-zinc-50
                  p-10
                  text-center
                  dark:border-zinc-800
                  dark:bg-zinc-900
                "
              >
                <FaBookOpen
                  aria-hidden="true"
                  className="
                    mx-auto
                    text-2xl
                    text-zinc-400
                    dark:text-zinc-600
                  "
                />

                <p
                  className="
                    mt-4
                    text-sm
                    text-zinc-500
                    dark:text-zinc-400
                  "
                >
                  No published notes available yet.
                </p>
              </div>
            )}

          {/* No category results */}
          {!loading &&
            !error &&
            notes.length > 0 &&
            filteredNotes.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border
                  border-zinc-200
                  bg-zinc-50
                  p-10
                  text-center
                  dark:border-zinc-800
                  dark:bg-zinc-900
                "
              >
                <p
                  className="
                    text-sm
                    text-zinc-500
                    dark:text-zinc-400
                  "
                >
                  No notes available in this category yet.
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="
                    mt-4
                    text-sm
                    font-bold
                    text-blue-600
                    hover:text-blue-700
                    dark:text-blue-400
                    dark:hover:text-blue-300
                  "
                >
                  View all notes
                </button>
              </div>
            )}

          {/* Notes */}
          {!loading &&
            !error &&
            filteredNotes.length > 0 && (
              <div
                className="
                  grid
                  gap-6
                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {filteredNotes.map((note, index) => {
                  const Icon =
                    CATEGORY_ICONS[note.category] ??
                    FaBookOpen;

                  // De-duplicate resource types for the badge row (e.g. 2 PDFs -> one PDF badge).
                  const resourceTypes = Array.from(
                    new Set(note.resources.map((r) => r.type)),
                  );

                  return (
                    <motion.article
                      key={note.id}
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
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.07,
                        ease: "easeOut",
                      }}
                      className="
                        group
                        flex
                        min-h-[310px]
                        flex-col
                        overflow-hidden
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
                      <div className="flex items-center justify-between">
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
                            ring-1
                            ring-blue-100
                            dark:bg-blue-950/50
                            dark:text-blue-400
                            dark:ring-blue-900/50
                          "
                        >
                          <Icon
                            aria-hidden="true"
                            className="text-base"
                          />
                        </div>

                        <span
                          className="
                            text-xs
                            font-medium
                            text-zinc-400
                            dark:text-zinc-600
                          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Category */}
                      <p
                        className="
                          mt-6
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-blue-600
                          dark:text-blue-400
                        "
                      >
                        {note.category}
                      </p>

                      {/* Title */}
                      <h3
                        className="
                          mt-2
                          text-xl
                          font-bold
                          tracking-tight
                          text-zinc-950
                          dark:text-white
                        "
                      >
                        {note.title}
                      </h3>

                      {/* Summary */}
                      <p
                        className="
                          mt-3
                          line-clamp-3
                          text-sm
                          leading-6
                          text-zinc-600
                          dark:text-zinc-400
                        "
                      >
                        {note.summary}
                      </p>

                      {/* Resource badges */}
                      {resourceTypes.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {resourceTypes.map((type) => {
                            const ResourceIcon =
                              RESOURCE_TYPE_ICONS[type];

                            return (
                              <span
                                key={type}
                                title={`Includes ${type.toLowerCase()} resource`}
                                className="
                                  flex
                                  h-6
                                  w-6
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-zinc-100
                                  text-[11px]
                                  text-zinc-500
                                  dark:bg-zinc-800
                                  dark:text-zinc-400
                                "
                              >
                                <ResourceIcon aria-hidden="true" />
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Read */}
                      <div className="mt-auto pt-7">
                        <Link
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
                            focus:outline-none
                            focus-visible:rounded
                            focus-visible:ring-2
                            focus-visible:ring-blue-500
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
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
        </div>

        {/* =====================================================
            EXPLORE ALL NOTES
        ====================================================== */}
        {!loading &&
          !error &&
          notes.length > MAX_FEATURED_NOTES && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="mt-12 flex justify-center"
            >
              <Link
                href="/notes"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-zinc-200
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-zinc-900
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-blue-300
                  hover:text-blue-600
                  hover:shadow-md
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                  focus-visible:ring-offset-2
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:text-white
                  dark:hover:border-blue-700
                  dark:hover:text-blue-400
                  dark:focus-visible:ring-offset-zinc-950
                "
              >
                Explore all topics
                <FaArrowRight
                  aria-hidden="true"
                  className="
                    text-xs
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </motion.div>
          )}
      </div>
    </section>
  );
}
