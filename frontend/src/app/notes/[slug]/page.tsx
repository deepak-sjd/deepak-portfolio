import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
  FaClock,
  FaDownload,
  FaExternalLinkAlt,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFolder,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa";

import {
  formatFileSize,
  getNoteBySlug,
  NoteApiResponse,
  NoteResourceApiResponse,
  NoteSummaryApiResponse,
  resolveResourceUrl,
  ResourceType,
} from "@/lib/api/notes";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

const RESOURCE_ICONS: Record<ResourceType, React.ElementType> = {
  PDF: FaFilePdf,
  DOCX: FaFileWord,
  IMAGE: FaFileImage,
  YOUTUBE: FaYoutube,
  WEBSITE: FaGlobe,
  OTHER: FaGlobe,
};

const RESOURCE_SHORT_LABEL: Record<ResourceType, string> = {
  PDF: "PDF",
  DOCX: "Doc",
  IMAGE: "Image",
  YOUTUBE: "Video",
  WEBSITE: "Link",
  OTHER: "Link",
};

const DOWNLOADABLE_TYPES: ResourceType[] = ["PDF", "DOCX", "IMAGE"];

function estimateReadingMinutes(content: string | null): number {
  if (!content) return 0;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

interface TocItem {
  level: 2 | 3;
  text: string;
  slug: string;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Pulls out all ## and ### headings from the raw Markdown content, in
 * document order, generating a unique anchor slug for each — used to build
 * the sidebar table of contents. Deliberately simple (line-based regex)
 * rather than a full Markdown parse, since headings always start a line.
 */
function extractHeadings(content: string | null): TocItem[] {
  if (!content) return [];

  const items: TocItem[] = [];
  const seenSlugs = new Map<string, number>();
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    let slug = slugifyHeading(text);

    const count = seenSlugs.get(slug) ?? 0;
    seenSlugs.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count}`;

    items.push({ level, text, slug });
  }

  return items;
}

export default async function NotePage({ params }: NotePageProps) {
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

  const isBrowseNode = note.children.length > 0;
  const isStudyPage = !isBrowseNode && !!note.content;
  const backHref = note.parentSlug ? `/notes/${note.parentSlug}` : "/#notes";
  const backLabel = note.parentTitle ? `Back to ${note.parentTitle}` : "Back to Notes";
  const readingMinutes = estimateReadingMinutes(note.content);
  const toc = isStudyPage ? extractHeadings(note.content) : [];
  const hasToc = toc.length >= 3; // not worth a sidebar for a couple of headings

  // Matches each rendered <h2>/<h3> to its pre-computed TOC slug, in document
  // order — react-markdown renders headings in the same order they appear
  // in the source, so a simple counter keeps them in sync with `toc`.
  let headingCursor = 0;
  const nextHeadingId = (_text: string): string => {
    const item = toc[headingCursor];
    headingCursor += 1;
    return item?.slug ?? "";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* Subtle decorative glow — keeps the existing dark theme, just adds depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-500/[0.07] blur-[120px] dark:bg-blue-500/[0.12]"
      />

      <article className={`relative mx-auto px-6 pb-24 pt-20 sm:pt-24 lg:px-8 ${isBrowseNode ? "max-w-7xl" : hasToc ? "max-w-6xl" : "max-w-4xl"}`}>

        {/* Back link */}
        <Link
          href={backHref}
          className="
            group inline-flex items-center gap-2 rounded-lg text-sm font-semibold
            text-zinc-500 transition-colors hover:text-blue-600
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            focus-visible:ring-offset-4
            dark:text-zinc-400 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950
          "
        >
          <FaArrowLeft
            aria-hidden="true"
            className="text-xs transition-transform duration-200 group-hover:-translate-x-1"
          />
          {backLabel}
        </Link>

        {/* Header */}
        <header className="mt-6 max-w-3xl">
          <div
            className="
              flex h-12 w-12 items-center justify-center rounded-xl
              bg-blue-50 text-blue-600 ring-1 ring-blue-100
              dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-900/50
            "
          >
            {isBrowseNode ? (
              <FaFolder aria-hidden="true" className="text-sm" />
            ) : (
              <FaBookOpen aria-hidden="true" className="text-sm" />
            )}
          </div>

          {note.category && (
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              {note.category}
            </p>
          )}

          <h1
            className="
              mt-3 text-4xl font-black leading-[1.08] tracking-[-0.035em]
              text-zinc-950 dark:text-white sm:text-5xl md:text-6xl
            "
          >
            {note.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {note.summary}
          </p>

          {isStudyPage && (
            <p className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-400 dark:text-zinc-600">
              <FaClock aria-hidden="true" />
              {readingMinutes} min read
            </p>
          )}
        </header>

        {/* Resources quick-access strip — leaf/study pages only, shown up top */}
        {isStudyPage && note.resources.length > 0 && (
          <div className="max-w-3xl">
            <ResourceQuickLinks resources={note.resources} />
          </div>
        )}

        {/* Mobile "On this page" — collapsible, only shown when there's a TOC and on small screens */}
        {hasToc && (
          <details className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-900">
            <summary className="cursor-pointer text-sm font-bold text-zinc-900 dark:text-white">
              On this page
            </summary>
            <nav className="mt-3 flex flex-col gap-2">
              {toc.map((item) => (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  className={`text-sm text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 ${item.level === 3 ? "pl-4" : ""}`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </details>
        )}

        {/* Divider */}
        <div className="my-8 h-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Content row: optional sticky TOC sidebar + the study content */}
        <div className={hasToc ? "lg:flex lg:items-start lg:gap-12" : ""}>

          {hasToc && (
            <nav
              aria-label="Table of contents"
              className="hidden shrink-0 lg:sticky lg:top-24 lg:block lg:w-56"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
                On this page
              </p>
              <ul className="mt-4 space-y-1 border-l border-zinc-200 dark:border-zinc-800">
                {toc.map((item) => (
                  <li key={item.slug}>
                    <a
                      href={`#${item.slug}`}
                      className={`
                        block border-l-2 border-transparent py-1 text-sm text-zinc-500
                        transition-colors hover:border-blue-500 hover:text-blue-600
                        dark:text-zinc-400 dark:hover:text-blue-400
                        ${item.level === 3 ? "pl-8" : "pl-4"}
                      `}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

        {/*
          Two different jobs, two different widths: a real study article is
          long-form reading and stays capped at 70ch for readability. A
          browse-node's content (like this "Fundamentals" intro) is just a
          couple of sentences before the Topics grid below it — capping that
          to 70ch made it look like a stray narrow column instead of an
          intentional intro, so it gets the wider max-w-3xl the header
          summary already uses, staying visually consistent with it.
        */}
        {note.content && (
          <div className={isBrowseNode ? "max-w-3xl" : "mx-auto max-w-[70ch] flex-1 lg:mx-0"}>
            <div className="text-base leading-8 text-zinc-700 dark:text-zinc-300 sm:text-lg">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="mb-4 mt-12 border-l-[3px] border-blue-500 pl-4 text-xl font-bold tracking-tight text-zinc-900 first:mt-0 dark:text-white sm:text-2xl">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => {
                    const text = String(children);
                    const id = nextHeadingId(text);
                    return (
                      <h2 id={id} className="mb-4 mt-12 scroll-mt-24 border-l-[3px] border-blue-500 pl-4 text-xl font-bold tracking-tight text-zinc-900 first:mt-0 dark:text-white sm:text-2xl">
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const text = String(children);
                    const id = nextHeadingId(text);
                    return (
                      <h3 id={id} className="mb-3 mt-8 scroll-mt-24 pl-4 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-200 sm:text-lg">
                        {children}
                      </h3>
                    );
                  },
                  p: ({ children }) => (
                    <p className="mb-6 last:mb-0">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-6 list-disc space-y-2 pl-6 marker:text-blue-500">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-6 list-decimal space-y-2 pl-6 marker:text-blue-500 marker:font-bold">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="pl-1">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-bold text-zinc-950 dark:text-white">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children, className }) => {
                    const isBlock = className?.includes("language-");
                    if (isBlock) {
                      return <code className={className}>{children}</code>;
                    }
                    return (
                      <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-blue-700 dark:bg-zinc-800 dark:text-blue-300">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="mb-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 dark:border-zinc-800 dark:bg-zinc-900">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="mb-6 border-l-4 border-blue-500 pl-4 italic text-zinc-600 dark:text-zinc-400">
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700 dark:text-blue-400"
                    >
                      {children}
                    </a>
                  ),
                  hr: () => (
                    <hr className="my-8 border-zinc-200 dark:border-zinc-800" />
                  ),
                }}
              >
                {note.content}
              </ReactMarkdown>
            </div>
          </div>
        )}

        </div>
        {/* end content row */}

        {/* Children grid — Field/Topic browse view */}
        {isBrowseNode && <ChildrenGrid children={note.children} />}

        {/* Full resource cards — browse pages (Field/Topic) only, shown at bottom */}
        {isBrowseNode && note.resources.length > 0 && (
          <NoteResources resources={note.resources} />
        )}

        {/* Bottom back link */}
        <div className="mt-14 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <Link
            href={backHref}
            className="
              group inline-flex items-center gap-2 text-sm font-bold text-blue-600
              transition-colors hover:text-blue-700
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              focus-visible:ring-offset-4
              dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-zinc-950
            "
          >
            <FaArrowLeft
              aria-hidden="true"
              className="text-xs transition-transform duration-200 group-hover:-translate-x-1"
            />
            {backLabel}
          </Link>
        </div>
      </article>
    </main>
  );
}

/**
 * Grid of child nodes (Topics under a Field, or Subtopics under a Topic).
 * Each card links deeper into the tree via its own slug.
 */
function ChildrenGrid({ children }: { children: NoteSummaryApiResponse[] }) {
  return (
    <section aria-labelledby="note-children-heading">
      <h2
        id="note-children-heading"
        className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
      >
        Topics
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children.map((child) => (
          <Link
            key={child.id}
            href={`/notes/${child.slug}`}
            className="
              group flex items-start justify-between gap-3 rounded-2xl border
              border-zinc-200 bg-white p-5 transition-all duration-200
              hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md
              dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700
            "
          >
            <div className="min-w-0">
              <p className="font-bold text-zinc-900 dark:text-white">{child.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                {child.summary}
              </p>
              <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-600">
                {child.hasChildren
                  ? "Browse subtopics"
                  : child.resourceCount > 0
                    ? `${child.resourceCount} resource${child.resourceCount === 1 ? "" : "s"}`
                    : "Read note"}
              </p>
            </div>

            <FaArrowRight
              aria-hidden="true"
              className="mt-1 shrink-0 text-xs text-zinc-300 transition-transform duration-300 group-hover:translate-x-1 dark:text-zinc-700"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Compact pill-style quick links shown at the TOP of study (leaf) pages —
 * "here's a video/PDF/link before you dive into the text below."
 */
function ResourceQuickLinks({ resources }: { resources: NoteResourceApiResponse[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {resources.map((resource) => {
        const Icon = RESOURCE_ICONS[resource.type];
        const isDownload = DOWNLOADABLE_TYPES.includes(resource.type);
        const href = resolveResourceUrl(resource.url);

        return (
          <a
            key={resource.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            download={isDownload ? resource.fileName ?? true : undefined}
            title={resource.label}
            className="
              group inline-flex items-center gap-2 rounded-full border
              border-zinc-200 bg-zinc-50 py-1.5 pl-3 pr-4 text-xs font-semibold
              text-zinc-700 transition-all duration-200
              hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm
              dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300
              dark:hover:border-blue-900/50 dark:hover:bg-blue-950/30 dark:hover:text-blue-300
            "
          >
            <Icon aria-hidden="true" className="text-blue-500 dark:text-blue-400" />
            <span className="max-w-[160px] truncate">{resource.label}</span>
            <span className="text-zinc-400 dark:text-zinc-600">
              {RESOURCE_SHORT_LABEL[resource.type]}
            </span>
          </a>
        );
      })}
    </div>
  );
}

/**
 * Full resource cards — shown at the bottom of browse pages (Field/Topic),
 * as "further materials covering this whole area."
 */
function NoteResources({ resources }: { resources: NoteResourceApiResponse[] }) {
  return (
    <section
      aria-labelledby="note-resources-heading"
      className="mt-14 border-t border-zinc-200 pt-10 dark:border-zinc-800"
    >
      <h2
        id="note-resources-heading"
        className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
      >
        Resources
      </h2>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => {
          const Icon = RESOURCE_ICONS[resource.type];
          const isDownload = DOWNLOADABLE_TYPES.includes(resource.type);
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
                  group flex items-center gap-3 rounded-2xl border border-zinc-200
                  bg-white p-4 transition-all duration-200
                  hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md
                  dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700
                "
              >
                <div
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                    bg-blue-50 text-blue-600
                    dark:bg-blue-950/50 dark:text-blue-400
                  "
                >
                  <Icon aria-hidden="true" className="text-sm" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">
                    {resource.label}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                    {isDownload
                      ? [resource.type, sizeLabel].filter(Boolean).join(" • ")
                      : resource.type === "YOUTUBE"
                        ? "Watch on YouTube"
                        : "Visit website"}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-xs text-zinc-300 transition-colors group-hover:text-blue-500 dark:text-zinc-700"
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
