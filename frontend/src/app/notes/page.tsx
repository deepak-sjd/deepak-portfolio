import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaBookOpen,
  FaBrain,
  FaChartLine,
  FaCode,
  FaDatabase,
  FaLayerGroup,
  FaMobileAlt,
  FaServer,
  FaSitemap,
  FaTools,
} from "react-icons/fa";

import { getRootNotes } from "@/lib/api/notes";

/**
 * Best-effort icon per field, matched by slug. Anything not in this map
 * (a new field added later) still renders fine — it just falls back to a
 * generic book icon instead of breaking or needing a code change here.
 */
const FIELD_ICONS: Record<string, IconType> = {
  "generative-ai": FaBrain,
  "machine-learning": FaChartLine,
  "deep-learning": FaLayerGroup,
  python: FaCode,
  "backend-engineering": FaServer,
  database: FaDatabase,
  "data-structures-algorithms": FaSitemap,
  "system-design": FaSitemap,
  devops: FaTools,
  "mobile-development": FaMobileAlt,
};

export const metadata = {
  title: "Notes",
  description:
    "A structured knowledge base of everything I work with — organized by field, broken down topic by topic.",
};

/**
 * The index/landing view for the whole /notes app. This route (and every
 * /notes/[slug] route) is wrapped by notes/layout.tsx, which already
 * provides the sticky "ALL NOTES" sidebar tree — so this page only needs to
 * render the right-hand content pane, same as a note detail page does. No
 * Navbar/Footer here on purpose: /notes is its own self-contained shell,
 * consistent with every note detail page under it.
 */
export default async function NotesIndexPage() {
  const fields = await getRootNotes();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-zinc-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-500/[0.07] blur-[120px] dark:bg-blue-500/[0.12]"
      />

      <article className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pt-12 lg:px-8">
        <header className="max-w-3xl">
          <div
            className="
              flex h-9 w-9 items-center justify-center rounded-lg
              bg-blue-50 text-blue-600 ring-1 ring-blue-100
              dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-900/50
            "
          >
            <FaBookOpen aria-hidden="true" className="text-xs" />
          </div>

          <h1
            className="
              mt-4 text-3xl font-extrabold leading-[1.15] tracking-[-0.025em]
              text-zinc-950 dark:text-white sm:text-4xl
            "
          >
            Notes
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            A structured knowledge base of everything I work with — organized
            by field, broken down topic by topic. Pick a field from the
            sidebar, or start here.
          </p>
        </header>

        <div className="my-6 h-px bg-zinc-200 dark:bg-zinc-800" />

        <section aria-labelledby="notes-fields-heading">
          <h2
            id="notes-fields-heading"
            className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
          >
            Fields
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fields.map((field) => {
              const FieldIcon = FIELD_ICONS[field.slug] ?? FaBookOpen;

              return (
                <Link
                  key={field.id}
                  href={`/notes/${field.slug}`}
                  className="
                    group relative flex flex-col gap-4 overflow-hidden rounded-2xl border
                    border-zinc-200 bg-white p-5 transition-all duration-300
                    hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10
                    dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-blue-800 dark:hover:shadow-blue-500/[0.06]
                  "
                >
                  {/* Accent glow that fades in on hover, matching the page's ambient background */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/0 blur-2xl transition-colors duration-300 group-hover:bg-blue-500/10"
                  />

                  <div className="flex items-start justify-between">
                    <div
                      className="
                        flex h-10 w-10 items-center justify-center rounded-xl
                        bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300
                        group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600
                        dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-900/50
                      "
                    >
                      <FieldIcon aria-hidden="true" className="text-sm" />
                    </div>

                    <FaArrowRight
                      aria-hidden="true"
                      className="mt-2 shrink-0 text-xs text-zinc-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500 dark:text-zinc-700"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-bold text-zinc-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {field.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {field.summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </article>
    </main>
  );
}
