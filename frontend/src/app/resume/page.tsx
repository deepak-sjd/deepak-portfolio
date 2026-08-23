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
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

function getResumeUrl(fileUrl: string): string {
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    return fileUrl;
  }

  return `${BACKEND_URL}${fileUrl}`;
}

function formatUpdatedDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadResume() {
      try {
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

  /* ============================================================
     LOADING STATE
     ============================================================ */

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8">
          <div
            aria-hidden="true"
            className="animate-pulse"
          >
            {/* Back link */}
            <div className="h-5 w-32 rounded-md bg-zinc-200 dark:bg-zinc-800" />

            {/* Header */}
            <div className="mt-12 max-w-4xl">
              <div className="h-11 w-11 rounded-xl bg-zinc-200 dark:bg-zinc-800" />

              <div className="mt-7 h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />

              <div className="mt-4 h-14 max-w-3xl rounded bg-zinc-200 dark:bg-zinc-800 sm:h-16" />

              <div className="mt-3 h-14 max-w-2xl rounded bg-zinc-200 dark:bg-zinc-800 sm:h-16" />

              <div className="mt-6 h-5 w-80 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <div className="h-12 w-44 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-12 w-44 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Preview */}
            <div className="mt-12 h-[700px] rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </main>
    );
  }

  /* ============================================================
     ERROR STATE
     ============================================================ */

  if (error || !resume) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-28 lg:px-8">
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

          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
                <FaFilePdf aria-hidden="true" />
              </div>

              <div>
                <h1 className="font-bold text-red-900 dark:text-red-300">
                  Resume unavailable
                </h1>

                <p className="mt-1 text-sm leading-6 text-red-700 dark:text-red-400">
                  The current resume could not be loaded. Please try again
                  later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const resumeUrl = getResumeUrl(resume.fileUrl);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8">

        {/* ======================================================
            BACK NAVIGATION
        ====================================================== */}

        <a
          href="/#about"
          className="
            group
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
            className="
              text-xs
              transition-transform
              duration-200
              group-hover:-translate-x-1
            "
          />

          Back to about
        </a>

        {/* ======================================================
            HEADER
        ====================================================== */}

        <header className="mt-12 max-w-4xl">

          {/* PDF icon */}
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-red-200
              bg-red-50
              text-red-600
              shadow-sm
              dark:border-red-900/50
              dark:bg-red-950/40
              dark:text-red-400
            "
          >
            <FaFilePdf
              aria-hidden="true"
              className="text-lg"
            />
          </div>

          {/* Section label */}
          <div className="mt-7 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-9 bg-blue-600 dark:bg-blue-400"
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
              Resume
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="
              mt-5
              max-w-3xl
              text-4xl
              font-black
              leading-[1.05]
              tracking-[-0.04em]
              text-zinc-950
              dark:text-white
              sm:text-5xl
              lg:text-6xl
          "
          >
            Deepak Kumar —{" "}
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
              AI Engineer & Full-Stack Developer
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-zinc-600
              dark:text-zinc-400
            "
          >
            A concise overview of my experience, engineering skills,
            AI expertise, projects, and professional background.
          </p>

          {/* Metadata */}
          <div
            className="
              mt-6
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
            <span>
              Version{" "}
              <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
                {resume.version}
              </strong>
            </span>

            <span aria-hidden="true">•</span>

            <span>
              Updated {formatUpdatedDate(resume.updatedAt)}
            </span>

            {resume.active && (
              <>
                <span aria-hidden="true">•</span>

                <span className="inline-flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-emerald-500"
                  />

                  Current version
                </span>
              </>
            )}
          </div>
        </header>

        {/* ======================================================
            ACTIONS
        ====================================================== */}

        <div className="mt-8 flex flex-wrap gap-3">

          {/* Open PDF */}
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
              duration-200
              hover:-translate-y-0.5
              hover:bg-blue-700
              hover:shadow-blue-600/30
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

          {/* Download */}
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
              shadow-sm
              transition-all
              duration-200
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

        {/* ======================================================
            PDF PREVIEW HEADER
        ====================================================== */}

        <div className="mt-14 flex items-end justify-between gap-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
          <div>
            <h2
              className="
                text-base
                font-bold
                text-zinc-950
                dark:text-white
              "
            >
              Resume preview
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-zinc-500
                dark:text-zinc-400
              "
            >
              Review the current version directly in the portfolio.
            </p>
          </div>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden
              items-center
              gap-2
              text-sm
              font-semibold
              text-zinc-600
              transition-colors
              hover:text-blue-600
              dark:text-zinc-400
              dark:hover:text-blue-400
              sm:inline-flex
            "
          >
            Open full PDF

            <FaExternalLinkAlt
              aria-hidden="true"
              className="text-[10px]"
            />
          </a>
        </div>

        {/* ======================================================
            PDF VIEWER
        ====================================================== */}

        <section
          aria-label="Resume PDF preview"
          className="
            mt-6
            overflow-hidden
            rounded-3xl
            border
            border-zinc-200
            bg-white
            shadow-[0_25px_80px_-35px_rgba(24,24,27,0.35)]
            dark:border-zinc-800
            dark:bg-zinc-900
            dark:shadow-black/30
          "
        >
          {/* Viewer toolbar */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-zinc-200
              bg-zinc-50
              px-5
              py-3
              dark:border-zinc-800
              dark:bg-zinc-900
            "
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-red-500"
              />

              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                PDF Document
              </span>
            </div>

            <span className="text-xs font-medium text-zinc-400">
              {resume.version}
            </span>
          </div>

          <iframe
            src={resumeUrl}
            title="Deepak Kumar resume PDF"
            loading="lazy"
            className="
              h-[75vh]
              min-h-[650px]
              w-full
              border-0
              bg-white
            "
          />
        </section>

      </div>
    </main>
  );
}