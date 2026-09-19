import type { Variants } from "framer-motion";

/**
 * Shared framer-motion variants for scroll/mount animations.
 *
 * These were previously copy-pasted (with slightly different numbers each
 * time) into Hero, Skills, Experience, Projects, and Contact. Import from
 * here instead of redefining a local `container`/`item`/`fadeUp` object in
 * every section — keeps the motion language consistent across the site and
 * means a single tweak here updates every section at once.
 */

/** Parent wrapper for a staggered group of children (use with `staggerItem`). */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

/** Child of `staggerContainer` — fades and rises in as the group animates in. */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Standalone fade-up for a scroll-triggered section heading or block. */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Smaller-offset fade-up for cards/list items inside a section. */
export const fadeUpSm: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Default viewport settings for `whileInView` — fire once, a bit before fully in view. */
export const viewportOnce = { once: true, amount: 0.25 } as const;