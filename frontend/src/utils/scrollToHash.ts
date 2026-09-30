/**
 * Smoothly scrolls to an in-page element by id, retrying across a few
 * animation frames in case the target hasn't mounted yet (e.g. right after
 * a client-side route change lands on "/" and the section below the fold
 * hasn't rendered on the very first frame).
 *
 * Uses a manual scroll offset (rather than scrollIntoView's default) because
 * the navbar is `position: fixed` and would otherwise cover the top of
 * whatever section we just scrolled to.
 */
export function scrollToHash(hash: string, maxAttempts = 15): void {
  if (typeof window === "undefined" || !hash) return;

  const id = hash.replace(/^#/, "");
  if (!id) return;

  let attempts = 0;

  const tryScroll = () => {
    const el = document.getElementById(id);

    if (el) {
      // The navbar is h-20 (80px) and fixed — measure it directly instead
      // of hardcoding 80, so this stays correct if the navbar's height
      // ever changes. +16px extra breathing room below it.
      const header = document.querySelector("header");
      const headerHeight = header?.getBoundingClientRect().height ?? 80;
      const offset = headerHeight + 16;

      const targetY = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetY, behavior: "smooth" });
      return;
    }

    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };

  tryScroll();
}