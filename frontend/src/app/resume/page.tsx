"use client";

import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaDownload,
  FaExternalLinkAlt,
  FaFilePdf,
} from "react-icons/fa";

import { getActiveResume, ResumeApiResponse } from "@/lib/api/resume";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8080";

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResume() {
      try {
        setLoading(true);
        setError(null);

        const data = await getActiveResume();

        setResume(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load resume."
        );
      } finally {
        setLoading(false);
      }
    }

    loadResume();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-10 h-12 w-12 rounded-xl bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-6 h-10 max-w-xl rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-4 h-5 max-w-md rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-10 h-[800px] rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !resume) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:px-8">
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

            Back to about
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

  const resumeUrl = resume.fileUrl.startsWith("http")
    ? resume.fileUrl
    : `${BACKEND_URL}${resume.fileUrl}`;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 lg:px-8">

        {/* ====================================================== */}
        {/* BACK */}
        {/* ====================================================== */}

        <a
          href="/#about"
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            text-sm
            font-semibold
            text-zinc-500
            transition-colors
            hover:text-blue-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:ring-offset-4
            dark:text-zinc-400
            dark:hover:text-blue-400
            dark:focus-visible:ring-offset-zinc-950
          "
        >
          <FaArrowLeft
            aria-hidden="true"
            className="text-xs"
          />

          Back to about
        </a>

        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <header className="mt-10">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-red-50
              text-red-600
              dark:bg-red-950/40
              dark:text-red-400
            "
          >
            <FaFilePdf aria-hidden="true" />
          </div>

          <p
            className="
              mt-7
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
              max-w-4xl
              text-4xl
              font-black
              leading-tight
              tracking-[-0.035em]
              text-zinc-950
              dark:text-white
              sm:text-5xl
            "
          >
            {resume.title}
          </h1>

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
              text-sm
              text-zinc-500
              dark:text-zinc-400
            "
          >
            <span>Version {resume.version}</span>

            <span aria-hidden="true">•</span>

            <span>Updated resume</span>
          </div>
        </header>

        {/* ====================================================== */}
        {/* ACTIONS */}
        {/* ====================================================== */}

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
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
              shadow-blue-600/20
              transition-all
              hover:-translate-y-0.5
              hover:bg-blue-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-4
              dark:focus-visible:ring-offset-zinc-950
            "
          >
            <FaExternalLinkAlt
              aria-hidden="true"
              className="text-xs"
            />

            Open in new tab
          </a>

          <a
            href={resumeUrl}
            download
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
              transition-all
              hover:-translate-y-0.5
              hover:border-blue-200
              hover:text-blue-600
              dark:border-zinc-800
              dark:bg-zinc-900
              dark:text-zinc-300
              dark:hover:border-zinc-700
              dark:hover:text-blue-400
            "
          >
            <FaDownload
              aria-hidden="true"
              className="text-xs"
            />

            Download Resume
          </a>
        </div>

        {/* ====================================================== */}
        {/* PDF VIEWER */}
        {/* ====================================================== */}

        <section
          aria-label="Resume preview"
          className="
            mt-10
            overflow-hidden
            rounded-3xl
            border
            border-zinc-200
            bg-white
            shadow-xl
            shadow-zinc-900/5
            dark:border-zinc-800
            dark:bg-zinc-900
            dark:shadow-black/20
          "
        >
          <iframe
            src={resumeUrl}
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