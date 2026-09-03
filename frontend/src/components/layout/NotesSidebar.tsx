"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

import { getNoteBySlug, getRootNotes } from "@/lib/api/notes";

interface TreeNode {
  slug: string;
  title: string;
  hasChildren: boolean;
}

/**
 * Site-wide Notes navigation tree (Field -> Topic -> Group -> Subtopic, or
 * as deep as the data goes), always visible on the left of every note page.
 * Styled as a GeeksforGeeks-style nested accordion: each level indents under
 * a thin connecting guide line, the whole ancestor path down to the current
 * page is kept bold/expanded, and only the current leaf gets the highlight
 * pill — so a reader always sees exactly where they are in a deep tree.
 *
 * Loads lazily: root Fields fetch on mount, and each node's children only
 * fetch the first time it's expanded — so we never pull the whole tree
 * (which can now be 100s of nodes) at once.
 */
export default function NotesSidebar() {
  const pathname = usePathname();
  const currentSlug = pathname?.startsWith("/notes/")
    ? pathname.replace("/notes/", "").split("/")[0]
    : null;

  // childrenMap[parentSlug] = its loaded children. "" = the root Fields.
  const [childrenMap, setChildrenMap] = useState<Record<string, TreeNode[]>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  // Every slug on the path from a root Field down to the current page —
  // used to keep that whole chain visually "lit up", not just the leaf.
  const [ancestorPath, setAncestorPath] = useState<Set<string>>(new Set());
  const autoExpandedFor = useRef<string | null>(null);

  const loadChildren = useCallback(async (parentSlug: string, hasChildren: boolean) => {
    if (!hasChildren) return;

    let alreadyLoaded = false;
    setChildrenMap((prev) => {
      alreadyLoaded = !!prev[parentSlug];
      return prev;
    });
    if (alreadyLoaded) return;

    setLoadingSlug(parentSlug);
    try {
      const detail = await getNoteBySlug(parentSlug);
      const kids: TreeNode[] = detail.children.map((c) => ({
        slug: c.slug,
        title: c.title,
        hasChildren: c.hasChildren,
      }));
      setChildrenMap((prev) => ({ ...prev, [parentSlug]: kids }));
    } catch {
      // Silently ignore — sidebar is a navigation aid, not critical path.
    } finally {
      setLoadingSlug(null);
    }
  }, []);

  // Load root Fields once on mount.
  useEffect(() => {
    let mounted = true;
    getRootNotes()
      .then((roots) => {
        if (!mounted) return;
        setChildrenMap((prev) => ({
          ...prev,
          "": roots.map((r) => ({ slug: r.slug, title: r.title, hasChildren: r.hasChildren })),
        }));
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-expand + bold the ancestor chain of whatever note is currently open,
  // no matter how deep it sits (Field -> Topic -> Group -> Subtopic -> ...).
  useEffect(() => {
    if (!currentSlug || autoExpandedFor.current === currentSlug) return;
    autoExpandedFor.current = currentSlug;

    (async () => {
      try {
        const ancestors: string[] = [];
        let cursor: string | null = currentSlug;
        let hops = 0;

        while (cursor && hops < 12) {
          const detail = await getNoteBySlug(cursor);
          if (detail.parentSlug) ancestors.unshift(detail.parentSlug);
          cursor = detail.parentSlug;
          hops += 1;
        }

        for (const ancestorSlug of ancestors) {
          await loadChildren(ancestorSlug, true);
        }

        setExpanded((prev) => {
          const next = { ...prev };
          ancestors.forEach((s) => { next[s] = true; });
          return next;
        });
        setAncestorPath(new Set([...ancestors, currentSlug]));
      } catch {
        // Non-critical — the tree just won't auto-expand this time.
      }
    })();
  }, [currentSlug, loadChildren]);

  const toggle = (node: TreeNode) => {
    setExpanded((prev) => ({ ...prev, [node.slug]: !prev[node.slug] }));
    if (!childrenMap[node.slug]) {
      loadChildren(node.slug, node.hasChildren);
    }
  };

  const roots = childrenMap[""];

  return (
    <nav aria-label="Notes navigation" className="text-sm">
      <Link
        href="/#notes"
        className="mb-5 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 hover:text-blue-600 dark:text-zinc-600 dark:hover:text-blue-400"
      >
        All Notes
      </Link>

      {!roots && (
        <div className="space-y-2.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
          ))}
        </div>
      )}

      {roots && (
        <ul className="space-y-0.5">
          {roots.map((node) => (
            <TreeItem
              key={node.slug}
              node={node}
              depth={0}
              childrenMap={childrenMap}
              expanded={expanded}
              loadingSlug={loadingSlug}
              currentSlug={currentSlug}
              ancestorPath={ancestorPath}
              onToggle={toggle}
            />
          ))}
        </ul>
      )}
    </nav>
  );
}

function TreeItem({
  node,
  depth,
  childrenMap,
  expanded,
  loadingSlug,
  currentSlug,
  ancestorPath,
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  childrenMap: Record<string, TreeNode[]>;
  expanded: Record<string, boolean>;
  loadingSlug: string | null;
  currentSlug: string | null;
  ancestorPath: Set<string>;
  onToggle: (node: TreeNode) => void;
}) {
  const isExpanded = !!expanded[node.slug];
  const isActive = node.slug === currentSlug;
  const isOnPath = ancestorPath.has(node.slug);
  const kids = childrenMap[node.slug];
  const isLoading = loadingSlug === node.slug;

  // Root Fields (depth 0) read as section headers: bolder, slightly larger,
  // no guide line above them. Every level below nests under a thin rail that
  // visually threads through however many levels the tree goes.
  const isRoot = depth === 0;

  // Indentation stops growing past 3 levels deep. Past that point the guide
  // line + expand/collapse state alone communicate nesting — letting padding
  // grow forever is what was eating all the width and forcing truncation at
  // depth 4-5. This is now the ONLY place indentation is applied — earlier
  // the wrapping <ul> also added its own marginLeft on top of this, so the
  // two stacked and roughly doubled real indentation at each level, which is
  // what was squeezing "SentencePiece" etc. into a sliver too narrow to hold
  // the word and forcing an ugly mid-word break. INDENT_STEP/MAX_INDENT_DEPTH
  // are the only two numbers to touch if the sidebar width ever changes.
  const INDENT_STEP = 14;
  const MAX_INDENT_DEPTH = 3;
  const indent = 10 + Math.min(depth, MAX_INDENT_DEPTH) * INDENT_STEP;
  // Where the child level's guide-line + rows should sit — same cap logic,
  // one level deeper. Used for the rail position below, NOT as a margin (see
  // note above on why stacking margin + padding was the bug).
  const childIndent = 10 + Math.min(depth + 1, MAX_INDENT_DEPTH) * INDENT_STEP;

  return (
    <li className="relative">
      <div
        className={`
          group relative flex items-start gap-1.5 rounded-lg py-[7px] pr-2 transition-colors
          ${isActive
            ? "bg-blue-50 dark:bg-blue-950/40"
            : "hover:bg-zinc-50 dark:hover:bg-zinc-900"}
        `}
        style={{ paddingLeft: `${indent}px` }}
      >
        {/* Active-item accent bar */}
        {isActive && (
          <span
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-blue-600 dark:bg-blue-400"
          />
        )}

        {node.hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(node)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            aria-expanded={isExpanded}
            className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center text-zinc-400 hover:text-blue-600 dark:text-zinc-600 dark:hover:text-blue-400"
          >
            {isLoading ? (
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-400" />
            ) : (
              <FaChevronRight
                aria-hidden="true"
                className="text-[9px] transition-transform duration-200"
                style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
              />
            )}
          </button>
        ) : (
          <span className="mt-[3px] h-4 w-4 shrink-0" />
        )}

        {/*
          No truncation, and no forced mid-word breaking. Titles wrap
          normally at word boundaries onto up to 2 lines — plenty for real
          note titles now that indentation no longer eats most of the width.
        */}
        <Link
          href={`/notes/${node.slug}`}
          title={node.title}
          className={`
            min-w-0 flex-1 py-0.5 leading-snug
            line-clamp-2
            ${isRoot ? "text-[13.5px]" : "text-[13px]"}
            ${isActive
              ? "font-bold text-blue-700 dark:text-blue-300"
              : isOnPath
                ? "font-semibold text-zinc-800 dark:text-zinc-200"
                : `text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 ${isRoot ? "font-semibold" : ""}`}
          `}
        >
          {node.title}
        </Link>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && kids && kids.length > 0 && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="relative overflow-hidden"
          >
            {/*
              Connecting guide line for this nesting level. Positioned with an
              explicit left offset that matches where the child rows' own
              padding starts — NOT a margin on this <ul>, so it can't stack
              with the children's padding the way the old version did.
            */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 top-1 w-px bg-zinc-200 dark:bg-zinc-800"
              style={{ left: `${childIndent - 8}px` }}
            />
            <div className="space-y-0.5 py-0.5">
              {kids.map((child) => (
                <TreeItem
                  key={child.slug}
                  node={child}
                  depth={depth + 1}
                  childrenMap={childrenMap}
                  expanded={expanded}
                  loadingSlug={loadingSlug}
                  currentSlug={currentSlug}
                  ancestorPath={ancestorPath}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
