import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaBookOpen,
  FaDownload,
  FaExternalLinkAlt,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa";

import {
  formatFileSize,
  getNoteBySlug,
  NoteApiResponse,
  NoteResourceApiResponse,
  resolveResourceUrl,
  ResourceType,
} from "@/lib/api/notes";

interface NotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const RESOURCE_ICONS: Record<ResourceType, React.ElementType> = {
  PDF: FaFilePdf,
  DOCX: FaFileWord,
  IMAGE: FaFileImage,
  YOUTUBE: FaYoutube,
  WEBSITE: FaGlobe,
  OTHER: FaGlobe,
};

const DOWNLOADABLE_TYPES: ResourceType[] = ["PDF", "DOCX", "IMAGE"];

export default async function NotePage({
  params,
}: NotePageProps) {
  const { slug } = await params;

  let note: NoteApiResponse;

  try {
    note = await getNoteBySlug(slug);
  } catch {
    notFound();
  }

  if (!note.published) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:px-8">

        {/* Back to notes */}
        <Link
          href="/#notes"
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

          Back to notes
        </Link>

        {/* Header */}
        <header className="mt-10">

          {/* Icon */}
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
              ring-1
              ring-blue-100
              dark:bg-blue-950/50
              dark:text-blue-400
              dark:ring-blue-900/50
            "
          >
            <FaBookOpen
              aria-hidden="true"
              className="text-sm"
            />
          </div>

          {/* Category */}
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

          {/* Title */}
          <h1
            className="
              mt-3
              text-4xl
              font-black
              leading-[1.08]
              tracking-[-0.035em]
              text-zinc-950
              dark:text-white
              sm:text-5xl
              md:text-6xl
            "
          >
            {note.title}
          </h1>

          {/* Summary */}
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

          {/* Metadata */}
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
              dark:text-zinc-500
            "
          >
            <span>
              Published{" "}
              {new Date(note.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </span>

            <span aria-hidden="true">•</span>

            <span>{note.category}</span>
          </div>
        </header>

        {/* Divider */}
        <div
          className="
            my-10
            h-px
            bg-zinc-200
            dark:bg-zinc-800
          "
        />

        {/* Note Content */}
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
                  whitespace-pre-line
                  last:mb-0
                "
              >
                {paragraph.trim()}
              </p>
            ))}
        </div>

        {/* Resources */}
        {(note.resources ?? []).length > 0 && (
          <NoteResources resources={note.resources} />
        )}

        {/* Bottom */}
        <div
          className="
            mt-14
            border-t
            border-zinc-200
            pt-8
            dark:border-zinc-800
          "
        >
          <Link
            href="/#notes"
            className="
              group
              inline-flex
              items-center
              gap-2
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
              className="
                text-xs
                transition-transform
                duration-200
                group-hover:-translate-x-1
              "
            />

            Back to all notes
          </Link>
        </div>

      </article>
    </main>
  );
}

/**
 * Renders every attached resource — uploaded files (PDF/DOCX/IMAGE) as
 * downloads, and external links (YouTube/website) as new-tab links.
 */
function NoteResources({
  resources,
}: {
  resources: NoteResourceApiResponse[];
}) {
  return (
    <section
      aria-labelledby="note-resources-heading"
      className="
        mt-14
        border-t
        border-zinc-200
        pt-10
        dark:border-zinc-800
      "
    >
      <h2
        id="note-resources-heading"
        className="
          text-sm
          font-bold
          uppercase
          tracking-[0.18em]
          text-zinc-500
          dark:text-zinc-400
        "
      >
        Resources
      </h2>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {resources.map((resource) => {
          const Icon = RESOURCE_ICONS[resource.type];
          const isDownload = DOWNLOADABLE_TYPES.includes(
            resource.type,
          );
          const href = resolveResourceUrl(resource.url);
          const sizeLabel = formatFileSize(resource.fileSize);

          return (
            <li key={resource.id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                download={isDownload ? resource.fileName ?? true : undefined}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-zinc-200
                  bg-white
                  p-4
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-blue-200
                  hover:shadow-md
                  dark:border-zinc-800
                  dark:bg-zinc-900/70
                  dark:hover:border-zinc-700
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    dark:bg-blue-950/50
                    dark:text-blue-400
                  "
                >
                  <Icon aria-hidden="true" className="text-sm" />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-zinc-900
                      dark:text-white
                    "
                  >
                    {resource.label}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-zinc-400
                      dark:text-zinc-500
                    "
                  >
                    {isDownload
                      ? [resource.type, sizeLabel]
                          .filter(Boolean)
                          .join(" • ")
                      : resource.type === "YOUTUBE"
                        ? "Watch on YouTube"
                        : "Visit website"}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    shrink-0
                    text-xs
                    text-zinc-300
                    transition-colors
                    group-hover:text-blue-500
                    dark:text-zinc-700
                  "
                >
                  {isDownload ? <FaDownload /> : <FaExternalLinkAlt />}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
