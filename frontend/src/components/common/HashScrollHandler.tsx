"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { scrollToHash } from "@/utils/scrollToHash";

/**
 * Mounted once in the root layout. Handles the "arrived on a page and the
 * URL already has a hash" case — e.g. someone on /projects clicks "Notes"
 * (-> "/#notes"), Next does a real route change to "/", and once that
 * lands, this scrolls to #notes. Same-page hash clicks (already on "/",
 * clicking another "/#..." link) are handled directly in Navbar/Footer's
 * onClick instead, since a pathname that doesn't change won't re-trigger
 * this effect.
 */
export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }
    // Intentionally only re-run on pathname change, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
