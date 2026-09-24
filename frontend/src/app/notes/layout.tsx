import type { ReactNode } from "react";

import BackToTop from "@/components/common/BackToTop";
import Navbar from "@/components/layout/Navbar";
import NotesSidebar from "@/components/layout/NotesSidebar";
import ScrollProgress from "@/components/common/ScrollProgress";

export default function NotesLayout({ children }: { children: ReactNode }) {
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
          className="
            sticky top-20 hidden h-[calc(100vh-5rem)] w-[26rem] shrink-0 overflow-y-auto
            border-r border-zinc-200 bg-white px-6 py-10
            lg:block
            dark:border-zinc-800 dark:bg-zinc-950
          "
        >
          <NotesSidebar />
        </aside>

        <div className="min-w-0 flex-1">{children}</div>

        <BackToTop />
      </div>
    </>
  );
}
