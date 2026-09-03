import type { ReactNode } from "react";

import BackToTop from "@/components/common/BackToTop";
import NotesSidebar from "@/components/layout/NotesSidebar";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1680px]">
      {/*
        Sticky + its own scroll: the sidebar pins in place as the article
        scrolls, and if the expanded tree is taller than the viewport, only
        the sidebar itself scrolls (not the whole page) — you never lose
        your place in the main content just to reach the nav.
      */}
      <aside
        className="
          sticky top-0 hidden h-screen w-80 shrink-0 overflow-y-auto
          border-r border-zinc-200 bg-white px-6 py-28
          lg:block
          dark:border-zinc-800 dark:bg-zinc-950
        "
      >
        <NotesSidebar />
      </aside>

      <div className="min-w-0 flex-1">{children}</div>

      <BackToTop />
    </div>
  );
}
