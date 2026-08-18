"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";

import { getNoteBySlug } from "@/lib/api/notes";

interface NotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Note {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  slug: string;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function NotePage({ params }: NotePageProps) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNote() {
      try {
        const { slug } = await params;

        const data = await getNoteBySlug(slug);

        if (!data.published) {
          window.location.href = "/#notes";
          return;
        }

        setNote(data);
      } catch {
        window.location.href = "/#notes";
      } finally {
        setLoading(false);
      }
    }

    loadNote();
  }, [params]);

  useEffect(() => {
    if (!note) return;

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [note]);

  const handleBackToNotes = () => {
    window.location.href = "/#notes";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-10 h-12 w-12 rounded-xl bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-7 h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-4 h-16 max-w-3xl rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="mt-6 h-6 max-w-2xl rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </main>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:px-8">

        {/* ========================================================= */}
        {/* BACK TO NOTES */}
        {/* ========================================================= */}

        <button
          type="button"
          onClick={handleBackToNotes}
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

          Back to notes
        </button>

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <header className="mt-10">

          <div
            className="
              flex
              h-12
              w-12
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
            {note.category}
          </p>

          <h1
            className="
              mt-3
              text-4xl
              font-black
              leading-tight
              tracking-[-0.035em]
              text-zinc-950
              dark:text-white
              sm:text-5xl
              md:text-6xl
            "
          >
            {note.title}
          </h1>

          <p
            className="
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-zinc-600
              dark:text-zinc-400
            "
          >
            {note.summary}
          </p>

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
              text-xs
              text-zinc-400
              dark:text-zinc-600
            "
          >
            <span>
              Published{" "}
              {new Date(note.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>

            <span aria-hidden="true">
              •
            </span>

            <span>
              {note.category}
            </span>
          </div>
        </header>

        {/* ========================================================= */}
        {/* DIVIDER */}
        {/* ========================================================= */}

        <div
          className="
            my-10
            h-px
            bg-zinc-200
            dark:bg-zinc-800
          "
        />

        {/* ========================================================= */}
        {/* NOTE CONTENT */}
        {/* ========================================================= */}

        <div
          className="
            max-w-none
            text-base
            leading-8
            text-zinc-700
            dark:text-zinc-300
            sm:text-lg
          "
        >
          {note.content
            .split(/\n\s*\n/)
            .map((paragraph, index) => (
              <p
                key={index}
                className="
                  mb-6
                  last:mb-0
                  whitespace-pre-line
                "
              >
                {paragraph.trim()}
              </p>
            ))}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM NAVIGATION */}
        {/* ========================================================= */}

        <div
          className="
            mt-14
            border-t
            border-zinc-200
            pt-8
            dark:border-zinc-800
          "
        >
          <button
            type="button"
            onClick={handleBackToNotes}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              text-sm
              font-bold
              text-blue-600
              transition-colors
              hover:text-blue-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              focus-visible:ring-offset-4
              dark:text-blue-400
              dark:hover:text-blue-300
              dark:focus-visible:ring-offset-zinc-950
            "
          >
            <FaArrowLeft
              aria-hidden="true"
              className="text-xs"
            />

            Back to all notes
          </button>
        </div>

      </article>
    </main>
  );
}