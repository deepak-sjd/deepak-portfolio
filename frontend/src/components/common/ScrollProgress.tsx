"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 will-change-transform"
      style={{
        scaleX: prefersReducedMotion ? 1 : scrollYProgress,
      }}
    />
  );
}