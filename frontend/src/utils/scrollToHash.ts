/**
 * Smoothly scrolls to an in-page element by id, retrying across a few
 * animation frames in case the target hasn't mounted yet (e.g. right after
 * a client-side route change lands on "/" and the section below the fold
 * hasn't rendered on the very first frame).
 */
export function scrollToHash(hash: string, maxAttempts = 15): void {
  if (typeof window === "undefined" || !hash) return;

  const id = hash.replace(/^#/, "");
  if (!id) return;

  let attempts = 0;

  const tryScroll = () => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };

  tryScroll();
}