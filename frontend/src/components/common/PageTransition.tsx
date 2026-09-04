"use client";

import { motion } from "framer-motion";

/**
 * Entrance animation for standalone pages reached via the nav (Skills,
 * Experience, Projects, Services). A fade + gentle rise on mount — the kind
 * of animated arrival modern portfolio sites use, without being a gimmick.
 * True cross-fade *exit* transitions between routes would need either the
 * browser View Transitions API or a routing library on top of Next's App
 * Router; this covers the "page arrives with motion" feel on its own.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
