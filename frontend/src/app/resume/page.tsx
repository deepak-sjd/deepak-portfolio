"use client";

import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaDownload,
  FaExternalLinkAlt,
} from "react-icons/fa";

import {
  getActiveResume,
  ResumeApiResponse,
} from "@/lib/api/resume";

export default function ResumePage() {
  const [resume, setResume] =
    useState<ResumeApiResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadResume() {
      try {
        setLoading(true);
        setError(null);

        const data = await getActiveResume();

        if (mounted) {
          setResume(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load resume."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadResume();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-8 h-10 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-4 h-5 w-96 max-w-full rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-8 h-[700px] rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !resume) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-32 lg:px-8">
          <a
            href="/#about"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-zinc-500
              transition-colors
              hover:text-blue-600
              dark:text-zinc-400
              dark:hover:text-blue-400
            "
          >
            <FaArrowLeft
              aria-hidden="true"
              className="text-xs"
            />

            Back to portfolio
          </a>

          <div
            role="alert"
            className="
              mt-10
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
            Unable to load the resume right now.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 lg:px-8">

        {/* Back */}
        <a
          href="/#about"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-zinc-500
            transition-colors
            hover:text-blue-600
            dark:text-zinc-400
            dark:hover:text-blue-400
          "
        >
          <FaArrowLeft
            aria-hidden="true"
            className="text-xs"
          />

          Back to portfolio
        </a>

        {/* Header */}
        <header className="mt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-blue-600
                  dark:text-blue-400
                "
              >
                Resume
              </p>

              <h1
                className="
                  mt-3
                  text-4xl
                  font-black
                  tracking-[-0.035em]
                  text-zinc-950
                  dark:text-white
                  sm:text-5xl
                "
              >
                {resume.title}
              </h1>

              <p
                className="
                  mt-4
                  text-sm
                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                Version {resume.version}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">

              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-zinc-200
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-zinc-700
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-zinc-300
                  hover:text-zinc-950
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:text-zinc-300
                  dark:hover:border-zinc-700
                  dark:hover:text-white
                "
              >
                <FaExternalLinkAlt
                  aria-hidden="true"
                  className="text-xs"
                />

                Open PDF
              </a>

              <a
                href={resume.fileUrl}
                download
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-blue-700
                "
              >
                <FaDownload
                  aria-hidden="true"
                  className="text-xs"
                />

                Download Resume
              </a>

            </div>
          </div>
        </header>

        {/* PDF */}
        <section
          aria-label="Resume preview"
          className="
            mt-10
            overflow-hidden
            rounded-2xl
            border
            border-zinc-200
            bg-zinc-100
            shadow-xl
            dark:border-zinc-800
            dark:bg-zinc-900
          "
        >
          <iframe
            src={resume.fileUrl}
            title={resume.title}
            className="
              h-[80vh]
              min-h-[700px]
              w-full
              border-0
            "
          />
        </section>

      </div>
    </main>
  );
}