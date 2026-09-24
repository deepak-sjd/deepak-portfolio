"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import BackToTop from "@/components/common/BackToTop";
import Navbar from "@/components/layout/Navbar";
import NotesSidebar from "@/components/layout/NotesSidebar";
import ScrollProgress from "@/components/common/ScrollProgress";

const DEFAULT_WIDTH = 416; // 26rem, matches the old fixed w-[26rem]
const MIN_WIDTH = 260;
const MAX_WIDTH = 620;
const STORAGE_KEY = "notes-sidebar-width";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(DEFAULT_WIDTH);

  // Restore a remembered width so it doesn't jump back to default on every visit.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = Number(saved);
      if (!Number.isNaN(parsed)) {
        setSidebarWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parsed)));
      }
    }
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      dragStartX.current = event.clientX;
      dragStartWidth.current = sidebarWidth;
      setIsDragging(true);
    },
    [sidebarWidth]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (event: PointerEvent) => {
      const delta = event.clientX - dragStartX.current;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragStartWidth.current + delta));
      setSidebarWidth(next);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setSidebarWidth((current) => {
        window.localStorage.setItem(STORAGE_KEY, String(current));
        return current;
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // While actively dragging: lock text selection and force the resize
    // cursor everywhere, not just while hovering the thin handle itself.
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <>
      {/*
        The main site Navbar is `fixed top-0` (h-20 / 80px tall) and doesn't
        take up flow space, so everything below needs a top offset to clear
        it — see pt-20 on the wrapper and top-20 on the sticky sidebar.
      */}
      <ScrollProgress />
      <Navbar />

      <div className="mx-auto flex max-w-[1920px] pt-20">
        {/*
          Sticky + its own scroll: the sidebar pins in place (right below
          the navbar) as the article scrolls, and if the expanded tree is
          taller than the viewport, only the sidebar itself scrolls (not
          the whole page) — you never lose your place in the main content
          just to reach the nav.
        */}
        <aside
          style={{ width: sidebarWidth }}
          className="
            sticky top-20 hidden h-[calc(100vh-5rem)] shrink-0 overflow-y-auto
            bg-white px-6 py-10
            lg:block
            dark:bg-zinc-950
          "
        >
          <NotesSidebar />
        </aside>

        {/*
          Drag handle: a thin hit-target sitting right on the border between
          the sidebar and the content. Hover/drag widens the visible line so
          it reads as an actual resizer, not just a static divider.
        */}
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize notes sidebar"
          onPointerDown={handlePointerDown}
          className="group sticky top-20 hidden h-[calc(100vh-5rem)] w-2 shrink-0 cursor-col-resize touch-none select-none items-stretch justify-center lg:flex"
        >
          <div
            className={`h-full w-px transition-colors duration-150 ${
              isDragging
                ? "bg-blue-500"
                : "bg-zinc-200 group-hover:bg-blue-400 dark:bg-zinc-800"
            }`}
          />
        </div>

        <div className="min-w-0 flex-1">{children}</div>

        <BackToTop />
      </div>
    </>
  );
}
