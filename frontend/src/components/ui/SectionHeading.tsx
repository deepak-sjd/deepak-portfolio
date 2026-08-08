"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  index: string; // e.g. "01"
  label: string; // e.g. "ABOUT"
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}

export default function SectionHeading({
  index,
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-xl"}
    >
      <div
        className={`flex items-center gap-3 font-mono-ui text-xs font-medium tracking-[0.2em] text-[var(--accent)] ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <span className="text-[var(--muted)]">{index}</span>
        <span className="h-px w-6 bg-[var(--border)]" aria-hidden="true" />
        <span>{label}</span>
      </div>

      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--ink)] text-balance md:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-base leading-8 text-[var(--muted)] md:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
