"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

/**
 * Appears once the user has scrolled down a bit, lets them jump straight
 * back to the top instead of scrolling all the way up manually.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="
        fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center
        rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-lg
        transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600
        dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-900/50 dark:hover:text-blue-400
      "
    >
      <FaArrowUp aria-hidden="true" className="text-sm" />
    </button>
  );
}
