"use client";

import { scrollToHash } from "@/utils/scrollToHash";

/**
 * Next's <Link> only reliably auto-scrolls to a "#hash" target on a real
 * pathname change. Clicking "/#notes" while already sitting on "/" is a
 * same-pathname navigation, and Next sometimes treats it as a no-op —
 * silently doing nothing. So: if we're already on the target page, skip
 * the router entirely and scroll by hand. If we're on a *different* page,
 * let <Link> do a real navigation — landing there is handled by
 * <HashScrollHandler /> in the root layout.
 *
 * Shared by Navbar and Footer so both stay in sync with one fix instead of
 * two copies quietly drifting apart.
 */
export default function useHashLinkClick(pathname: string) {
  return (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes("#")) return;

    const [path, hash] = href.split("#");
    const targetPath = path || "/";

    if (pathname === targetPath) {
      event.preventDefault();
      scrollToHash(hash);
      window.history.replaceState(null, "", href);
    }
  };
}