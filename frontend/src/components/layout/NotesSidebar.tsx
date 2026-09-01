"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

import { getNoteBySlug, getRootNotes } from "@/lib/api/notes";

interface TreeNode {
  slug: string;
  title: string;
  hasChildren: boolean;
}

/**
 * Site-wide Notes navigation tree (Field -> Topic -> Subtopic), always visible
 * on the left of every note page. Loads lazily: root Fields fetch on mount,
 * and each node's children only fetch the first time it's expanded — so we
 * never pull all ~300 nodes at once. Auto-expands the path to whichever note
 * is currently open, so the reader always sees where they are in the tree.
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
  const autoExpandedFor = useRef<string | null>(null);

  const loadChildren = useCallback(async (parentSlug: string, hasChildren: boolean) => {
    if (!hasChildren) return;
    setChildrenMap((prev) => {
      if (prev[parentSlug]) return prev; // already loaded
      return prev;
    });

    // Re-check outside setState to avoid firing a duplicate fetch.
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

  // Auto-expand the ancestor chain of whatever note is currently open.
  useEffect(() => {
    if (!currentSlug || autoExpandedFor.current === currentSlug) return;
    autoExpandedFor.current = currentSlug;

    (async () => {
      try {
        const ancestors: string[] = [];
        let cursor: string | null = currentSlug;
        let hops = 0;

        while (cursor && hops < 10) {
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
        className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 hover:text-blue-600 dark:text-zinc-600 dark:hover:text-blue-400"
      >
        All Notes
      </Link>

      {!roots && (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
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
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  childrenMap: Record<string, TreeNode[]>;
  expanded: Record<string, boolean>;
  loadingSlug: string | null;
  currentSlug: string | null;
  onToggle: (node: TreeNode) => void;
}) {
  const isExpanded = !!expanded[node.slug];
  const isActive = node.slug === currentSlug;
  const kids = childrenMap[node.slug];
  const isLoading = loadingSlug === node.slug;

  return (
    <li>
      <div
        className={`
          group flex items-center gap-1 rounded-lg py-1.5 pr-2 transition-colors
          ${isActive ? "bg-blue-50 dark:bg-blue-950/40" : "hover:bg-zinc-50 dark:hover:bg-zinc-900"}
        `}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        {node.hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(node)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            className="flex h-4 w-4 shrink-0 items-center justify-center text-zinc-400 hover:text-blue-600 dark:text-zinc-600 dark:hover:text-blue-400"
          >
            {isLoading ? (
              <span className="block h-2 w-2 animate-pulse rounded-full bg-zinc-400" />
            ) : isExpanded ? (
              <FaChevronDown className="text-[10px]" />
            ) : (
              <FaChevronRight className="text-[10px]" />
            )}
          </button>
        ) : (
          <span className="h-4 w-4 shrink-0" />
        )}

        <Link
          href={`/notes/${node.slug}`}
          className={`
            min-w-0 flex-1 truncate py-0.5 text-[13px] leading-tight
            ${isActive
              ? "font-bold text-blue-700 dark:text-blue-300"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"}
          `}
        >
          {node.title}
        </Link>
      </div>

      {isExpanded && kids && kids.length > 0 && (
        <ul className="space-y-0.5">
          {kids.map((child) => (
            <TreeItem
              key={child.slug}
              node={child}
              depth={depth + 1}
              childrenMap={childrenMap}
              expanded={expanded}
              loadingSlug={loadingSlug}
              currentSlug={currentSlug}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
